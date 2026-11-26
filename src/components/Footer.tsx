import React from 'react';
import { 
  Heart, 
  Lock, 
  MapPin, 
  ArrowUp, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BioData } from '../types';

interface FooterProps {
  bioData: BioData;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Footer: React.FC<FooterProps> = ({ bioData, onOpenAdmin, isAdminLoggedIn }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050607] border-t border-white/10 dark:border-white/10 light:border-black/5 pt-16 pb-12 overflow-hidden">
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Identity & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1.5px]">
                <div className="w-full h-full bg-[#0d0e12] rounded-[10px] flex items-center justify-center font-bold text-white font-mono text-lg">
                  TA
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">
                  {bioData.displayName}
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  {bioData.title}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Crafting premium visual branding, high-retention video edits, and generative AI assets for creators, businesses, and global clients.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <MapPin size={13} className="text-emerald-400" />
              <span>Naogaon Sadar, Rajshahi - 6500, Bangladesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#showcase" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Featured Gigs & Demos
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Freelance Gig Packages
                </a>
              </li>
              <li>
                <a href="#biodata" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Bio-Data & Background
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Direct Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Freelancing Channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold block">
              Freelancing Channels
            </span>
            <div className="flex flex-col gap-2">
              <a
                href={bioData.fiverrUrl || "https://www.fiverr.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-xs text-gray-300 transition-colors group"
              >
                <span className="flex items-center gap-2 font-semibold text-[#1dbf73]">
                  <span className="w-2 h-2 rounded-full bg-[#1dbf73]"></span>
                  Fiverr Profile & Gigs
                </span>
                <ExternalLink size={13} className="text-gray-400 group-hover:text-white" />
              </a>

              <a
                href={bioData.whatsapp || "https://wa.me/8801303686239"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 text-xs text-gray-300 transition-colors group"
              >
                <span className="flex items-center gap-2 font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  WhatsApp Chat Direct
                </span>
                <ExternalLink size={13} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} {bioData.fullName}. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>

            {/* Subtle Secret Admin Trigger */}
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
              title="Admin Portal (Firebase Auth & Firestore)"
            >
              {isAdminLoggedIn ? <ShieldCheck size={12} /> : <Lock size={12} />}
              <span>{isAdminLoggedIn ? 'Admin Panel (Online)' : 'Admin'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
