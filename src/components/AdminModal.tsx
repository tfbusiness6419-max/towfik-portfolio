import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  Layers, 
  User, 
  Cloud, 
  LogOut, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  UserPlus,
  UploadCloud,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { BioData, GigItem } from '../types';
import { 
  loginAdmin, 
  registerAdmin,
  logoutAdmin, 
  saveGig, 
  deleteGig, 
  saveBioData, 
  seedInitialDataToFirestore,
  resetToDefaults, 
  isFirebaseConfigured, 
  firebaseConfig,
  AuthStateUser 
} from '../lib/firebase';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthStateUser | null;
  setCurrentUser: (user: AuthStateUser | null) => void;
  gigs: GigItem[];
  setGigs: React.Dispatch<React.SetStateAction<GigItem[]>>;
  bioData: BioData;
  setBioData: React.Dispatch<React.SetStateAction<BioData>>;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  setCurrentUser,
  gigs,
  setGigs,
  bioData,
  setBioData,
}) => {
  const [activeTab, setActiveTab] = useState<'gigs' | 'bio' | 'firebase'>('gigs');
  
  // Auth state
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [loginEmail, setLoginEmail] = useState('mdtowfikahmmed@gmail.com');
  const [loginPass, setLoginPass] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // New Gig Form State
  const [newGig, setNewGig] = useState<Partial<GigItem>>({
    title: '',
    category: 'Video Editing',
    description: '',
    mediaType: 'video',
    mediaUrl: '',
    thumbnailUrl: '',
    fiverrUrl: 'https://www.fiverr.com',
    tags: ['New', 'Showcase'],
    toolsUsed: ['CapCut', 'Premiere'],
  });
  const [tagsInput, setTagsInput] = useState('CapCut, Viral, 4K');
  const [toolsInput, setToolsInput] = useState('CapCut Pro, Premiere Pro');
  const [gigMessage, setGigMessage] = useState('');

  // Editable Bio State
  const [editableBio, setEditableBio] = useState<BioData>({ ...bioData });
  const [bioStatus, setBioStatus] = useState<{ type: 'success' | 'warning' | 'error'; message: string } | null>(null);
  const [bioSaving, setBioSaving] = useState(false);
  const [seedMessage, setSeedMessage] = useState('');

  // Synchronize local editable form whenever parent bioData updates
  React.useEffect(() => {
    if (bioData) {
      setEditableBio({ ...bioData });
    }
  }, [bioData]);

  if (!isOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setAuthLoading(true);
    try {
      if (authMode === 'register') {
        const user = await registerAdmin(loginEmail, loginPass);
        setCurrentUser(user);
        setAuthSuccess('Account created and signed in successfully!');
      } else {
        const user = await loginAdmin(loginEmail, loginPass);
        setCurrentUser(user);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
  };

  const handleAddGig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGig.title || !newGig.mediaUrl || !newGig.thumbnailUrl) {
      setGigMessage('Please provide Title, Media URL, and Thumbnail URL.');
      return;
    }

    const createdGig: GigItem = {
      id: `gig-${Date.now()}`,
      title: newGig.title || 'Untitled Gig',
      category: (newGig.category as any) || 'Video Editing',
      description: newGig.description || '',
      mediaType: newGig.mediaType || 'video',
      mediaUrl: newGig.mediaUrl || '',
      thumbnailUrl: newGig.thumbnailUrl || '',
      fiverrUrl: newGig.fiverrUrl || 'https://www.fiverr.com',
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      toolsUsed: toolsInput.split(',').map(t => t.trim()).filter(Boolean),
      featured: true,
      createdAt: new Date().toISOString()
    };

    try {
      await saveGig(createdGig);
      setGigs(prev => [createdGig, ...prev]);
      setGigMessage('Gig saved and synced to Cloud Firestore successfully!');
    } catch (err: any) {
      setGigMessage('Saved to local store. (Firestore note: ' + (err.message || 'check rules') + ')');
    }
    setTimeout(() => setGigMessage(''), 3500);

    // Reset form
    setNewGig({
      title: '',
      category: 'Video Editing',
      description: '',
      mediaType: 'video',
      mediaUrl: '',
      thumbnailUrl: '',
      fiverrUrl: 'https://www.fiverr.com',
    });
  };

  const handleDeleteGig = async (id: string) => {
    if (confirm('Are you sure you want to delete this gig?')) {
      try {
        await deleteGig(id);
        setGigs(prev => prev.filter(g => g.id !== id));
        setGigMessage('Gig deleted successfully.');
      } catch (err: any) {
        setGigMessage('Deleted locally. (Firestore note: ' + err.message + ')');
      }
      setTimeout(() => setGigMessage(''), 3000);
    }
  };

  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    setBioSaving(true);
    setBioStatus(null);
    try {
      const res = await saveBioData(editableBio);
      setBioData(editableBio);
      if (res.firestoreSynced) {
        setBioStatus({
          type: 'success',
          message: 'Bio-data saved and synchronized to Cloud Firestore (settings/biodata) in real time!'
        });
      } else {
        setBioStatus({
          type: 'warning',
          message: `Saved locally in browser. (Firestore note: ${res.error || 'Permission denied or offline'})`
        });
      }
    } catch (err: any) {
      setBioStatus({
        type: 'error',
        message: `Save error: ${err.message || 'Unknown failure'}`
      });
    } finally {
      setBioSaving(false);
      setTimeout(() => {
        // clear after 6 seconds
        setBioStatus(null);
      }, 6000);
    }
  };

  const handleSeedToFirestore = async () => {
    if (confirm('Upload all sample gigs and bio-data directly to your Cloud Firestore database?')) {
      try {
        setSeedMessage('Uploading sample items to Firestore...');
        await seedInitialDataToFirestore();
        setSeedMessage('Sample data uploaded to Cloud Firestore successfully!');
      } catch (err: any) {
        setSeedMessage('Firestore upload note: ' + (err.message || 'Check Firestore security rules'));
      }
      setTimeout(() => setSeedMessage(''), 4000);
    }
  };

  const handleResetData = () => {
    if (confirm('Reset all gigs and bio-data back to default sample data?')) {
      const { gigs: g, bio: b } = resetToDefaults();
      setGigs(g);
      setBioData(b);
      setEditableBio(b);
      alert('Data reset to default successfully!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#0d0e12] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl z-10 text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Secret Admin Dashboard</span>
                {currentUser && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {currentUser.isDemo ? 'Demo Admin' : 'Firebase Verified'}
                  </span>
                )}
              </h3>
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Project: {firebaseConfig.projectId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-rose-400 transition-colors"
                title="Sign Out"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* If NOT logged in: Show Firebase Sign-In / Register Form */}
          {!currentUser ? (
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                  <Lock size={26} />
                </div>
                <h4 className="text-xl font-bold text-white">Firebase Admin Authentication</h4>
                <p className="text-xs text-gray-400">
                  Firebase project: <strong className="text-emerald-400 font-mono">{firebaseConfig.projectId}</strong>
                </p>
              </div>

              {/* Mode switch */}
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setAuthError(''); }}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${authMode === 'signin' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setAuthError(''); }}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${authMode === 'register' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  Register Admin
                </button>
              </div>

              {authError && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs leading-relaxed">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {authSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                  <CheckCircle2 size={15} className="shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 block">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter password (e.g. admin123 or your secure pass)"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {authMode === 'register' ? <UserPlus size={16} /> : <Lock size={16} />}
                  <span>
                    {authLoading 
                      ? (authMode === 'register' ? 'Registering...' : 'Signing in...') 
                      : (authMode === 'register' ? 'Register Admin Account' : 'Sign In with Firebase')}
                  </span>
                </button>
              </form>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-3.5 text-center text-xs space-y-1.5">
                <p className="text-gray-400">
                  Pre-configured for Towfik Ahmmed.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLoginPass('admin123');
                    setTimeout(() => {
                      loginAdmin(loginEmail, 'admin123').then(user => setCurrentUser(user));
                    }, 50);
                  }}
                  className="font-mono text-emerald-400 hover:underline block mx-auto"
                >
                  Quick Sign-In with Demo Password (admin123)
                </button>
              </div>

            </div>
          ) : (
            /* If Logged In: Full Admin Dashboard */
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveTab('gigs')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'gigs' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Layers size={15} />
                  <span>Manage Gigs & Demos ({gigs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('bio')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'bio' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <User size={15} />
                  <span>Update Bio-Data & Details</span>
                </button>

                <button
                  onClick={() => setActiveTab('firebase')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'firebase' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Cloud size={15} />
                  <span>Firebase & Cloud Sync</span>
                </button>
              </div>

              {/* TAB 1: GIGS MANAGEMENT */}
              {activeTab === 'gigs' && (
                <div className="space-y-8">
                  {gigMessage && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>{gigMessage}</span>
                    </div>
                  )}

                  {/* Add New Gig Form */}
                  <form onSubmit={handleAddGig} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Plus size={16} className="text-emerald-400" />
                        <span>Add New Gig / Showcase Demo</span>
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <UploadCloud size={12} />
                        <span>Saves directly to Cloud Firestore</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Gig Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4K CapCut Reel with Motion Captions"
                          value={newGig.title || ''}
                          onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Category *</label>
                        <select
                          value={newGig.category}
                          onChange={(e) => setNewGig({ ...newGig, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-[#14151a] border border-white/10 text-xs text-white"
                        >
                          <option value="Graphics Design">Graphics Design</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="AI Projects">AI Projects</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Short Description *</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Highlight key value, style, hooks or client results..."
                        value={newGig.description || ''}
                        onChange={(e) => setNewGig({ ...newGig, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Media Type</label>
                        <select
                          value={newGig.mediaType}
                          onChange={(e) => setNewGig({ ...newGig, mediaType: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-[#14151a] border border-white/10 text-xs text-white"
                        >
                          <option value="video">Video (MP4 / YouTube)</option>
                          <option value="image">Image (High Res)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Media URL *</label>
                        <input
                          type="text"
                          required
                          placeholder="Direct mp4 URL, YouTube URL, or Image link"
                          value={newGig.mediaUrl || ''}
                          onChange={(e) => setNewGig({ ...newGig, mediaUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Thumbnail URL *</label>
                        <input
                          type="text"
                          required
                          placeholder="Image preview URL for card"
                          value={newGig.thumbnailUrl || ''}
                          onChange={(e) => setNewGig({ ...newGig, thumbnailUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Fiverr / Project Link</label>
                        <input
                          type="text"
                          placeholder="https://www.fiverr.com/..."
                          value={newGig.fiverrUrl || ''}
                          onChange={(e) => setNewGig({ ...newGig, fiverrUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-300">Tools Used</label>
                        <input
                          type="text"
                          value={toolsInput}
                          onChange={(e) => setToolsInput(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all"
                    >
                      <Plus size={15} />
                      <span>Publish New Gig to Firestore</span>
                    </button>
                  </form>

                  {/* Existing Gigs List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white">Current Showcase Items ({gigs.length})</h4>
                    <div className="space-y-2">
                      {gigs.map((g) => (
                        <div
                          key={g.id}
                          className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <img
                              src={g.thumbnailUrl || g.mediaUrl}
                              alt={g.title}
                              className="w-12 h-10 object-cover rounded-lg bg-black shrink-0"
                            />
                            <div className="truncate">
                              <p className="text-xs font-bold text-white truncate">{g.title}</p>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                <span className="text-emerald-400">{g.category}</span>
                                <span>•</span>
                                <span>{g.mediaType.toUpperCase()}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteGig(g.id)}
                            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors shrink-0 ml-2"
                            title="Delete Gig"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: UPDATE BIO-DATA & DETAILS */}
              {activeTab === 'bio' && (
                <form onSubmit={handleSaveBio} className="space-y-4">
                  {/* Status Banner (Top) */}
                  {bioStatus && (
                    <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 border transition-all animate-in fade-in ${
                      bioStatus.type === 'success'
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                        : bioStatus.type === 'warning'
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                        : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    }`}>
                      {bioStatus.type === 'success' ? (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle size={16} className={bioStatus.type === 'warning' ? 'text-amber-400 shrink-0' : 'text-rose-400 shrink-0'} />
                      )}
                      <span className="font-medium">{bioStatus.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Full Name</label>
                      <input
                        type="text"
                        value={editableBio.fullName || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, fullName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Display Name</label>
                      <input
                        type="text"
                        value={editableBio.displayName || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, displayName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Professional Title / Role</label>
                      <input
                        type="text"
                        value={editableBio.title || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Hero Headline Hook</label>
                      <input
                        type="text"
                        value={editableBio.headline || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, headline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-300">Personal & Freelance Summary</label>
                    <textarea
                      rows={3}
                      value={editableBio.summary || ''}
                      onChange={(e) => setEditableBio({ ...editableBio, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white resize-none focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-gray-300">Career Objective</label>
                    <textarea
                      rows={2}
                      value={editableBio.objective || ''}
                      onChange={(e) => setEditableBio({ ...editableBio, objective: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white resize-none focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Location</label>
                      <input
                        type="text"
                        value={editableBio.location || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Email Address</label>
                      <input
                        type="email"
                        value={editableBio.email || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Phone</label>
                      <input
                        type="text"
                        value={editableBio.phone || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">WhatsApp Link / Number</label>
                      <input
                        type="text"
                        placeholder="https://wa.me/8801303686239"
                        value={editableBio.whatsapp || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Fiverr Profile Link</label>
                      <input
                        type="text"
                        value={editableBio.fiverrUrl || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, fiverrUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Profile Image Path / URL</label>
                      <input
                        type="text"
                        placeholder="/images/towfik.jpg"
                        value={editableBio.profileImage || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, profileImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Status Badge</label>
                      <input
                        type="text"
                        value={editableBio.statusText || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, statusText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Years Exp</label>
                      <input
                        type="text"
                        value={editableBio.experienceYears || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, experienceYears: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Completed Projects</label>
                      <input
                        type="text"
                        value={editableBio.projectsCompleted || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, projectsCompleted: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-gray-300">Satisfaction Rate</label>
                      <input
                        type="text"
                        value={editableBio.happyClientsRate || ''}
                        onChange={(e) => setEditableBio({ ...editableBio, happyClientsRate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Bar with Inline Status & Spinner */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="w-full sm:w-auto flex-1">
                      {bioStatus && (
                        <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border ${
                          bioStatus.type === 'success'
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                            : bioStatus.type === 'warning'
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                            : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                        }`}>
                          {bioStatus.type === 'success' ? (
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          ) : (
                            <AlertTriangle size={14} className={bioStatus.type === 'warning' ? 'text-amber-400 shrink-0' : 'text-rose-400 shrink-0'} />
                          )}
                          <span className="truncate">{bioStatus.message}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={bioSaving}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all shrink-0 cursor-pointer"
                    >
                      {bioSaving ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Saving to Firestore...</span>
                        </>
                      ) : (
                        <>
                          <Save size={15} />
                          <span>Save & Sync Bio-Data to Firestore</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: FIREBASE & REAL-TIME SYNC */}
              {activeTab === 'firebase' && (
                <div className="space-y-6">
                  {seedMessage && (
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      <span>{seedMessage}</span>
                    </div>
                  )}

                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud className="text-emerald-400" size={20} />
                        <h4 className="text-base font-bold text-white">Live Firebase Configuration</h4>
                      </div>
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                        🟢 Active & Verified
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Project ID:</span>
                        <span className="font-mono text-emerald-400 font-bold">{firebaseConfig.projectId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Auth Domain:</span>
                        <span className="font-mono text-white">{firebaseConfig.authDomain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Storage Bucket:</span>
                        <span className="font-mono text-white">{firebaseConfig.storageBucket}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">App ID:</span>
                        <span className="font-mono text-white">{firebaseConfig.appId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Measurement ID:</span>
                        <span className="font-mono text-white">{firebaseConfig.measurementId}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-gray-300">
                        First time connecting? Populate your fresh Firestore collection with rich sample gigs in one click:
                      </p>
                      <button
                        onClick={handleSeedToFirestore}
                        className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-2 transition-colors"
                      >
                        <UploadCloud size={15} />
                        <span>Seed Initial Data to Firestore</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-6 space-y-3">
                    <h4 className="text-sm font-bold text-rose-300">Reset Local Browser Cache</h4>
                    <p className="text-xs text-gray-400">
                      Reverts local cache back to Towfik Ahmmed's default initial portfolio showcase.
                    </p>
                    <button
                      onClick={handleResetData}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-mono flex items-center gap-2 transition-colors"
                    >
                      <RotateCcw size={14} />
                      <span>Reset Local Cache</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
