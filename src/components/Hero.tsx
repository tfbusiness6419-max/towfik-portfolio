import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Video, 
  Palette, 
  Cpu, 
  Download, 
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { BioData } from '../types';

interface HeroProps {
  bioData: BioData;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ bioData, onExploreWork }) => {
  const marqueeItems = [
    "GRAPHICS DESIGN",
    "CANVA PRO SPECIALIST",
    "CAPCUT VIDEO EDITING",
    "ADOBE PHOTOSHOP",
    "TIKTOK & REELS HOOKS",
    "YOUTUBE THUMBNAILS (HIGH CTR)",
    "AI IMAGE GENERATION",
    "MIDJOURNEY PROMPTING",
    "AI VIDEO CREATION",
    "PREMIERE PRO EDITING",
    "FIVERR FREELANCER",
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-emerald-600/15 via-cyan-600/10 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] light:opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Presentation */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {bioData.statusText || "Available for Freelance & Fiverr Gigs"}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-gray-300 dark:text-gray-300 light:text-gray-600 bg-white/5 border border-white/10">
                <MapPin size={13} className="text-emerald-400" />
                <span>Naogaon, Rajshahi, BD</span>
              </span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white dark:text-white light:text-gray-900 leading-[1.08]">
                Hi, I'm <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  {bioData.displayName}
                </span>
              </h1>

              <p className="font-serif-instrument text-2xl sm:text-3xl lg:text-4xl italic text-gray-300 dark:text-gray-300 light:text-gray-700 font-normal">
                Graphics Designer, Video Editor & AI Content Creator
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 max-w-2xl leading-relaxed">
              {bioData.headline || "Crafting high-converting visual branding, high-retention CapCut & Premiere Pro edits, and cutting-edge generative AI workflows for global creators and businesses."}
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-mono bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-gray-300">
                <Palette size={14} className="text-emerald-400" />
                <span>Canva & Photoshop</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-gray-300">
                <Video size={14} className="text-cyan-400" />
                <span>CapCut & Premiere Pro</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono bg-white/[0.04] border border-white/10 rounded-lg px-3 py-1.5 text-gray-300">
                <Cpu size={14} className="text-purple-400" />
                <span>Midjourney & AI Workflows</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Work & Gigs</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={bioData.fiverrUrl || "https://www.fiverr.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold text-sm sm:text-base shadow-md shadow-[#1dbf73]/20 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Order on Fiverr</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 hover:text-white font-medium text-sm sm:text-base transition-colors"
              >
                <MessageSquare size={16} />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 dark:border-white/10 light:border-black/5 max-w-lg">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-gray-900 font-mono">
                  {bioData.experienceYears || "3+"}
                </span>
                <span className="text-xs text-gray-400 font-mono">Years Experience</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  {bioData.projectsCompleted || "80+"}
                </span>
                <span className="text-xs text-gray-400 font-mono">Designs & Edits</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                  {bioData.happyClientsRate || "100%"}
                </span>
                <span className="text-xs text-gray-400 font-mono">Quality Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column: Towfik's Portrait & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-white/0 border border-white/15 shadow-2xl backdrop-blur-sm group">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition duration-500 -z-10" />

              {/* Photo Container */}
              <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-[#121318]">
                <img
                  src={bioData.profileImage || "/images/towfik.jpg"}
                  alt={bioData.fullName}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[1.02] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if local image path has loading issue
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('unsplash')) {
                      target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
                    }
                  }}
                />

                {/* Subtle gradient vignette overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 pointer-events-none" />

                {/* Bottom card identity tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#080808]/85 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {bioData.fullName}
                      </p>
                      <p className="text-xs text-emerald-400 font-mono mt-0.5">
                        Creative Media & AI Specialist
                      </p>
                    </div>
                    <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Sparkles size={16} />
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#0e1014]/90 backdrop-blur-md border border-white/15 rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5 animate-bounce-slow">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Video size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">CapCut & Premiere</span>
                  <span className="block text-[10px] text-gray-400 font-mono">4K Short-Form Edit</span>
                </div>
              </div>

              {/* Floating Badge 2: Mid-Left */}
              <div className="absolute bottom-28 -left-4 sm:-left-8 bg-[#0e1014]/90 backdrop-blur-md border border-white/15 rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Palette size={16} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Canva & Photoshop</span>
                  <span className="block text-[10px] text-gray-400 font-mono">High CTR Visuals</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Skills Marquee Ribbon */}
      <div className="w-full mt-16 py-3.5 bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.02] border-y border-white/10 dark:border-white/10 light:border-black/5 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {marqueeItems.concat(marqueeItems).map((item, index) => (
            <div key={index} className="flex items-center gap-8 text-xs font-mono font-semibold tracking-wider text-gray-400 hover:text-emerald-400 transition-colors">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
