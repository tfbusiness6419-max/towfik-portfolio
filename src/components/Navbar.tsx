import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ExternalLink, 
  Briefcase, 
  User, 
  Layers, 
  Mail,
  ShieldCheck
} from 'lucide-react';
import { BioData } from '../types';

interface NavbarProps {
  bioData: BioData;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  bioData,
  darkMode,
  setDarkMode,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#showcase', icon: Layers },
    { label: 'Services', href: '#services', icon: Briefcase },
    { label: 'Bio-Data', href: '#biodata', icon: User },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#080808]/85 dark:bg-[#080808]/85 light:bg-white/85 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-black/5 shadow-lg' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0d0e12] rounded-[10px] flex items-center justify-center font-bold text-white font-mono text-lg">
                TA
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white dark:text-white light:text-gray-900 block leading-tight group-hover:text-emerald-400 transition-colors">
                {bioData.displayName}
              </span>
              <span className="text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Freelancer & Creator
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] dark:bg-white/[0.04] light:bg-black/[0.03] border border-white/10 dark:border-white/10 light:border-black/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle, Admin Pill, Fiverr CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-white hover:scale-105 transition-all"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-cyan-600" />}
            </button>

            {/* Admin Badge if logged in */}
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full hover:bg-emerald-500/30 transition-colors"
              >
                <ShieldCheck size={14} />
                <span>Admin Active</span>
              </button>
            )}

            {/* Fiverr CTA */}
            <a
              href={bioData.fiverrUrl || "https://www.fiverr.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1dbf73] hover:bg-[#19a463] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-[#1dbf73]/20 hover:shadow-[#1dbf73]/40 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <span>Fiverr Gigs</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d10] dark:bg-[#0c0d10] light:bg-white border-b border-white/10 px-6 py-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-300 dark:text-gray-300 light:text-gray-800 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-100 transition-colors"
                >
                  <Icon size={18} className="text-emerald-400" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={bioData.fiverrUrl || "https://www.fiverr.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1dbf73] text-white py-3 rounded-xl font-semibold shadow-md"
            >
              <span>Visit Fiverr Profile</span>
              <ExternalLink size={16} />
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 py-2 hover:text-white"
            >
              <ShieldCheck size={14} />
              <span>Admin Access</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
