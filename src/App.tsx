import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ServicesSection } from './components/ServicesSection';
import { BioDataSection } from './components/BioDataSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MediaModal } from './components/MediaModal';
import { AdminModal } from './components/AdminModal';
import { GigItem, BioData } from './types';
import { INITIAL_BIO_DATA, INITIAL_GIGS } from './data/initialData';
import { fetchBioData, fetchGigs, subscribeToAuth, subscribeToGigs, subscribeToBioData, AuthStateUser } from './lib/firebase';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [gigs, setGigs] = useState<GigItem[]>(INITIAL_GIGS);
  const [bioData, setBioData] = useState<BioData>(INITIAL_BIO_DATA);
  const [selectedGig, setSelectedGig] = useState<GigItem | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthStateUser | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  // Theme synchronization with document
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [darkMode]);

  // Real-time subscriptions for Gigs, Bio-Data and Firebase Auth
  useEffect(() => {
    // Initial fetch
    fetchGigs().then(data => { if (data?.length) setGigs(data); });
    fetchBioData().then(bio => { if (bio) setBioData(bio); });

    // Live real-time Firestore listeners
    const unsubscribeGigs = subscribeToGigs((liveGigs) => {
      if (liveGigs && liveGigs.length > 0) {
        setGigs(liveGigs);
      }
    });

    const unsubscribeBio = subscribeToBioData((liveBio) => {
      if (liveBio) {
        setBioData(liveBio);
      }
    });

    const unsubscribeAuth = subscribeToAuth((user) => {
      setCurrentUser(user);
    });

    return () => {
      if (unsubscribeGigs) unsubscribeGigs();
      if (unsubscribeBio) unsubscribeBio();
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  // Keyboard shortcut for secret admin access (Ctrl + Shift + A or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExploreWork = () => {
    const el = document.getElementById('showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] dark:bg-[#080808] light:bg-[#f8fafc] text-white dark:text-white light:text-gray-900 transition-colors duration-300">
      
      {/* Navigation */}
      <Navbar
        bioData={bioData}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setAdminOpen(true)}
        isAdminLoggedIn={Boolean(currentUser)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero 
          bioData={bioData} 
          onExploreWork={handleExploreWork} 
        />
        
        <ShowcaseSection 
          gigs={gigs} 
          onSelectGig={(gig) => setSelectedGig(gig)} 
        />
        
        <ServicesSection 
          bioData={bioData} 
        />
        
        <BioDataSection 
          bioData={bioData} 
        />
        
        <ContactSection 
          bioData={bioData} 
        />
      </main>

      {/* Footer */}
      <Footer
        bioData={bioData}
        onOpenAdmin={() => setAdminOpen(true)}
        isAdminLoggedIn={Boolean(currentUser)}
      />

      {/* Detail / Playback Modal for Gigs */}
      <MediaModal
        gig={selectedGig}
        onClose={() => setSelectedGig(null)}
      />

      {/* Secret Admin Panel (Firebase Auth + Firestore) */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        gigs={gigs}
        setGigs={setGigs}
        bioData={bioData}
        setBioData={setBioData}
      />

    </div>
  );
}
