import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ExternalLink,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BioData } from '../types';

interface ContactSectionProps {
  bioData: BioData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ bioData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Short-Form Video Editing',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#1dbf73']
    });

    setSubmitted(true);
    setTimeout(() => {
      // In production or demo, could open mailto or mail client
      const mailtoUrl = `mailto:${bioData.email}?subject=Project Inquiry from ${encodeURIComponent(formData.name)} (${formData.service})&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MessageSquare size={14} />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-gray-900">
            Let's Build Something <span className="font-serif-instrument italic font-normal text-gradient-emerald">Remarkable</span>
          </h2>
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm sm:text-base">
            Have a project in mind, need custom YouTube thumbnails, or want high-velocity short-form edits? Reach out directly or order via Fiverr.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block">Direct Email</span>
                    <a 
                      href={`mailto:${bioData.email}`} 
                      className="text-sm font-semibold text-white dark:text-white light:text-gray-900 hover:text-emerald-400 transition-colors"
                    >
                      {bioData.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(bioData.email, 'email')}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block">Phone & WhatsApp</span>
                    <a 
                      href={bioData.whatsapp || `https://wa.me/8801303686239`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white dark:text-white light:text-gray-900 hover:text-cyan-400 transition-colors"
                    >
                      {bioData.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyToClipboard(bioData.phone, 'phone')}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check size={16} className="text-cyan-400" /> : <Copy size={16} />}
                  </button>
                  <a
                    href={bioData.whatsapp || `https://wa.me/8801303686239`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    title="Open WhatsApp"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div className="bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-6 shadow-xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-400 block">Based In</span>
                  <p className="text-sm font-semibold text-white dark:text-white light:text-gray-900">
                    Naogaon Sadar, Rajshahi, Bangladesh (GMT+6)
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 pt-2 border-t border-white/5">
                Working smoothly with international clients across US, UK, Europe, Australia & Asia time zones.
              </p>
            </div>

            {/* Fiverr Gig Highlight Banner */}
            <div className="bg-gradient-to-tr from-[#1dbf73]/20 via-[#0e1014] to-emerald-950/20 border border-[#1dbf73]/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#1dbf73]">FIVERR VERIFIED SERVICES</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#1dbf73]/20 text-[#1dbf73] border border-[#1dbf73]/30">
                  Secure Escrow
                </span>
              </div>
              <p className="text-sm text-gray-200 mb-4">
                Prefer placing your order through Fiverr's protected milestone and payment system?
              </p>
              <a
                href={bioData.fiverrUrl || "https://www.fiverr.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white text-xs font-semibold shadow-md shadow-[#1dbf73]/20 transition-all"
              >
                <span>Go to Towfik's Fiverr</span>
                <ExternalLink size={14} />
              </a>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl p-6 sm:p-10 shadow-xl">
            <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-400" />
              <span>Send a Quick Project Inquiry</span>
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">
                  Thank You, {formData.name}!
                </h4>
                <p className="text-sm text-gray-300 max-w-md mx-auto">
                  Your inquiry has been compiled and is ready to send. Towfik will review your project brief and respond promptly!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-gray-300 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-gray-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-gray-300 block">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-gray-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300 block">Interested Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#14151a] border border-white/10 focus:border-emerald-500 focus:outline-none text-sm text-white transition-colors"
                  >
                    <option value="Short-Form Video Editing (CapCut/Premiere)">Short-Form Video Editing (TikTok/Reels/Shorts)</option>
                    <option value="YouTube Thumbnails & Banners">YouTube Thumbnails & Banners (High CTR)</option>
                    <option value="Canva Social Media Branding Kit">Canva Social Media Branding Kit</option>
                    <option value="AI Image & Video Generation">AI Image & Video Generation</option>
                    <option value="Full Retainer / Long-Term Collaboration">Full Retainer / Long-Term Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300 block">Project Brief & Details *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your brand, video ideas, deadline, or references..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-emerald-500 focus:outline-none text-sm text-white placeholder-gray-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  <span>Send Project Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
