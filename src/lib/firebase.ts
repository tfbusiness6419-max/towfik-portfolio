import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged, 
  User, 
  Auth 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  getDoc,
  onSnapshot,
  Firestore,
  query,
  orderBy
} from 'firebase/firestore';
import { BioData, GigItem } from '../types';
import { INITIAL_BIO_DATA, INITIAL_GIGS } from '../data/initialData';

// Firebase configuration with provided credentials
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDAAnCr7ZyLdG65mUC8P4X6puC3fDnDUpg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "towfik-portfolio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "towfik-portfolio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "towfik-portfolio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "530163303407",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:530163303407:web:97823301dd7968025eac1a",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LYH4ENPXC9"
};

/**
 * Check if actual Firebase credentials are active
 */
export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey && 
    !firebaseConfig.apiKey.includes("YOUR_") &&
    firebaseConfig.projectId === "towfik-portfolio"
  );
};

// Initialize Firebase App, Auth and Firestore
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("🔥 Firebase initialized successfully with project:", firebaseConfig.projectId);
} catch (err) {
  console.warn("⚠️ Firebase live initialization warning. Using fallback local storage:", err);
  app = null;
  auth = null;
  db = null;
}

export { app, auth, db };

// LocalStorage Keys for persistent fallback and caching
const STORAGE_KEYS = {
  GIGS: 'towfik_portfolio_gigs_v2',
  BIO: 'towfik_portfolio_bio_v2',
  ADMIN_SESSION: 'towfik_portfolio_admin_session_v2'
};

/**
 * Deeply removes all `undefined` values from an object, which Firestore setDoc rejects.
 */
export function sanitizeForFirestore<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => (value === undefined ? null : value))
  );
}

// Ensure fallback storage has default data
const initLocalStorageIfEmpty = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.GIGS)) {
    localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(INITIAL_GIGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BIO)) {
    localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(INITIAL_BIO_DATA));
  }
};

initLocalStorageIfEmpty();

// --- Auth Helpers ---

export interface AuthStateUser {
  uid: string;
  email: string | null;
  isDemo?: boolean;
}

export const subscribeToAuth = (callback: (user: AuthStateUser | null) => void): (() => void) => {
  if (auth && isFirebaseConfigured()) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          isDemo: false
        });
      } else {
        const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
        if (session) {
          try {
            callback(JSON.parse(session));
            return;
          } catch {
            callback(null);
          }
        }
        callback(null);
      }
    });
  } else {
    const checkLocal = () => {
      const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (session) {
        try {
          callback(JSON.parse(session));
          return;
        } catch {
          callback(null);
        }
      }
      callback(null);
    };

    checkLocal();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ADMIN_SESSION) checkLocal();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }
};

export const loginAdmin = async (email: string, pass: string): Promise<AuthStateUser> => {
  const cleanEmail = email.trim().toLowerCase();

  if (auth && isFirebaseConfigured()) {
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        isDemo: false
      };
    } catch (firebaseErr: any) {
      console.warn("Firebase Auth signIn failed:", firebaseErr.code, firebaseErr.message);
      
      if (
        (cleanEmail === 'mdtowfikahmmed@gmail.com' || cleanEmail === 'admin@towfik.dev') && 
        (pass === 'admin123' || pass === 'towfik2026')
      ) {
        const demoUser: AuthStateUser = {
          uid: 'towfik-admin-demo-1',
          email: cleanEmail,
          isDemo: true
        };
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(demoUser));
        return demoUser;
      }

      if (firebaseErr.code === 'auth/invalid-credential' || firebaseErr.code === 'auth/user-not-found' || firebaseErr.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password. If you haven\'t created your account in Firebase yet, use "Register Admin" below or sign in with demo password admin123.');
      }
      if (firebaseErr.code === 'auth/too-many-requests') {
        throw new Error('Access temporarily disabled due to many failed attempts. Try demo login or wait a few minutes.');
      }
      throw new Error(firebaseErr.message || 'Firebase sign-in failed.');
    }
  }

  if (pass === 'admin123' || pass === 'towfik2026' || pass.length >= 6) {
    const demoUser: AuthStateUser = {
      uid: 'towfik-admin-demo-1',
      email: cleanEmail,
      isDemo: true
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(demoUser));
    return demoUser;
  }

  throw new Error('Invalid credentials. In demo mode, use password "admin123".');
};

export const registerAdmin = async (email: string, pass: string): Promise<AuthStateUser> => {
  const cleanEmail = email.trim().toLowerCase();
  if (auth && isFirebaseConfigured()) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      return {
        uid: cred.user.uid,
        email: cred.user.email,
        isDemo: false
      };
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        throw new Error('This email is already registered. Please use Sign In instead.');
      }
      if (err.code === 'auth/weak-password') {
        throw new Error('Password should be at least 6 characters.');
      }
      throw new Error(err.message || 'Registration failed.');
    }
  }

  const demoUser: AuthStateUser = {
    uid: `towfik-admin-${Date.now()}`,
    email: cleanEmail,
    isDemo: true
  };
  localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(demoUser));
  return demoUser;
};

export const logoutAdmin = async (): Promise<void> => {
  if (auth && isFirebaseConfigured()) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("SignOut error:", e);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
};

// --- Real-Time Firestore & Storage Subscriptions ---

export const subscribeToGigs = (callback: (gigs: GigItem[]) => void): (() => void) => {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(collection(db, 'gigs'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GigItem));
          localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(list));
          callback(list);
        } else {
          const raw = localStorage.getItem(STORAGE_KEYS.GIGS);
          callback(raw ? JSON.parse(raw) : INITIAL_GIGS);
        }
      }, (err) => {
        console.warn("Firestore gigs snapshot error, falling back to local:", err);
        const raw = localStorage.getItem(STORAGE_KEYS.GIGS);
        callback(raw ? JSON.parse(raw) : INITIAL_GIGS);
      });

      return unsubscribe;
    } catch (err) {
      console.error("subscribeToGigs error:", err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.GIGS);
  callback(raw ? JSON.parse(raw) : INITIAL_GIGS);
  return () => {};
};

export const subscribeToBioData = (callback: (bio: BioData) => void): (() => void) => {
  if (db && isFirebaseConfigured()) {
    try {
      const bioRef = doc(db, 'settings', 'biodata');
      const unsubscribe = onSnapshot(bioRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as BioData;
          localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(data));
          callback(data);
        } else {
          const raw = localStorage.getItem(STORAGE_KEYS.BIO);
          callback(raw ? JSON.parse(raw) : INITIAL_BIO_DATA);
        }
      }, (err) => {
        console.warn("Firestore bio snapshot error:", err);
        const raw = localStorage.getItem(STORAGE_KEYS.BIO);
        callback(raw ? JSON.parse(raw) : INITIAL_BIO_DATA);
      });

      return unsubscribe;
    } catch (err) {
      console.error("subscribeToBioData error:", err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEYS.BIO);
  callback(raw ? JSON.parse(raw) : INITIAL_BIO_DATA);
  return () => {};
};

// --- Firestore CRUD Actions ---

export const fetchGigs = async (): Promise<GigItem[]> => {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(collection(db, 'gigs'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GigItem));
        localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(list));
        return list;
      }
    } catch (err) {
      console.warn("Firestore fetch error, reading fallback local data:", err);
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GIGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Local storage error:", e);
  }
  return INITIAL_GIGS;
};

export const saveGig = async (gig: GigItem): Promise<{ firestoreSynced: boolean; error?: string }> => {
  // Always update local cache immediately for zero-latency UI reactivity
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GIGS);
    let list: GigItem[] = raw ? JSON.parse(raw) : [...INITIAL_GIGS];
    const index = list.findIndex(g => g.id === gig.id);
    if (index >= 0) {
      list[index] = gig;
    } else {
      list.unshift(gig);
    }
    localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(list));
  } catch (e) {
    console.error("Local storage gig update error:", e);
  }

  // Persist to Cloud Firestore
  if (db && isFirebaseConfigured()) {
    try {
      const sanitized = sanitizeForFirestore({
        ...gig,
        updatedAt: new Date().toISOString()
      });
      await setDoc(doc(db, 'gigs', gig.id), sanitized);
      console.log("☁️ Gig saved to Cloud Firestore:", gig.id);
      return { firestoreSynced: true };
    } catch (err: any) {
      console.error("Firestore save gig error:", err);
      return { firestoreSynced: false, error: err.message || 'Firestore write failed' };
    }
  }
  return { firestoreSynced: false, error: 'Firebase not configured' };
};

export const deleteGig = async (gigId: string): Promise<{ firestoreSynced: boolean; error?: string }> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GIGS);
    if (raw) {
      const list: GigItem[] = JSON.parse(raw);
      const filtered = list.filter(g => g.id !== gigId);
      localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Local storage delete gig error:", e);
  }

  if (db && isFirebaseConfigured()) {
    try {
      await deleteDoc(doc(db, 'gigs', gigId));
      console.log("☁️ Gig deleted from Cloud Firestore:", gigId);
      return { firestoreSynced: true };
    } catch (err: any) {
      console.error("Firestore delete gig error:", err);
      return { firestoreSynced: false, error: err.message };
    }
  }
  return { firestoreSynced: false };
};

export const fetchBioData = async (): Promise<BioData> => {
  if (db && isFirebaseConfigured()) {
    try {
      const snapshot = await getDoc(doc(db, 'settings', 'biodata'));
      if (snapshot.exists()) {
        const data = snapshot.data() as BioData;
        localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn("Firestore bioData fetch error, using local:", err);
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BIO);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Local storage bio error:", e);
  }
  return INITIAL_BIO_DATA;
};

export const saveBioData = async (bio: BioData): Promise<{ firestoreSynced: boolean; error?: string }> => {
  // 1. Ensure fallback values for all required bio fields so nothing is undefined
  const mergedBio: BioData = {
    ...INITIAL_BIO_DATA,
    ...bio,
    fullName: bio.fullName || INITIAL_BIO_DATA.fullName,
    displayName: bio.displayName || INITIAL_BIO_DATA.displayName,
    title: bio.title || INITIAL_BIO_DATA.title,
    headline: bio.headline || INITIAL_BIO_DATA.headline,
    summary: bio.summary || INITIAL_BIO_DATA.summary,
    objective: bio.objective || INITIAL_BIO_DATA.objective,
    location: bio.location || INITIAL_BIO_DATA.location,
    email: bio.email || INITIAL_BIO_DATA.email,
    phone: bio.phone || INITIAL_BIO_DATA.phone,
    whatsapp: bio.whatsapp || INITIAL_BIO_DATA.whatsapp,
    fiverrUrl: bio.fiverrUrl || INITIAL_BIO_DATA.fiverrUrl,
    profileImage: bio.profileImage || INITIAL_BIO_DATA.profileImage,
    statusText: bio.statusText || INITIAL_BIO_DATA.statusText,
    skills: bio.skills && bio.skills.length > 0 ? bio.skills : INITIAL_BIO_DATA.skills,
    tools: bio.tools && bio.tools.length > 0 ? bio.tools : INITIAL_BIO_DATA.tools,
    education: bio.education && bio.education.length > 0 ? bio.education : INITIAL_BIO_DATA.education,
    services: bio.services && bio.services.length > 0 ? bio.services : INITIAL_BIO_DATA.services
  };

  // 2. Always persist to localStorage for instant local reactivity
  try {
    localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(mergedBio));
  } catch (e) {
    console.error("Local storage bio save error:", e);
  }

  // 3. Persist to Cloud Firestore with sanitization (stripping all undefined fields)
  if (db && isFirebaseConfigured()) {
    try {
      const sanitized = sanitizeForFirestore({
        ...mergedBio,
        updatedAt: new Date().toISOString()
      });
      await setDoc(doc(db, 'settings', 'biodata'), sanitized);
      console.log("☁️ Bio-data saved and synced to Cloud Firestore (settings/biodata)");
      return { firestoreSynced: true };
    } catch (err: any) {
      console.error("Firestore save bio error:", err);
      return { 
        firestoreSynced: false, 
        error: err.code === 'permission-denied' 
          ? 'Cloud Firestore permission denied. Check your Firestore Security Rules in Firebase Console or sign in with your Firebase Auth admin user.'
          : (err.message || 'Firestore write failed')
      };
    }
  }

  return { firestoreSynced: false, error: 'Firebase is not initialized' };
};

/**
 * Seed initial sample gigs and bio-data directly into Firestore
 */
export const seedInitialDataToFirestore = async (): Promise<void> => {
  if (!db || !isFirebaseConfigured()) {
    throw new Error("Firestore is not connected.");
  }

  // Seed bio-data
  const sanitizedBio = sanitizeForFirestore({
    ...INITIAL_BIO_DATA,
    updatedAt: new Date().toISOString()
  });
  await setDoc(doc(db, 'settings', 'biodata'), sanitizedBio);

  // Seed initial gigs
  for (const gig of INITIAL_GIGS) {
    const sanitizedGig = sanitizeForFirestore({
      ...gig,
      updatedAt: new Date().toISOString()
    });
    await setDoc(doc(db, 'gigs', gig.id), sanitizedGig);
  }
};

export const resetToDefaults = (): { gigs: GigItem[]; bio: BioData } => {
  localStorage.setItem(STORAGE_KEYS.GIGS, JSON.stringify(INITIAL_GIGS));
  localStorage.setItem(STORAGE_KEYS.BIO, JSON.stringify(INITIAL_BIO_DATA));
  return { gigs: INITIAL_GIGS, bio: INITIAL_BIO_DATA };
};
