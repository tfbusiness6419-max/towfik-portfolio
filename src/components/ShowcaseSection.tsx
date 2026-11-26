import React, { useState, useMemo } from 'react';
import { 
  Layers, 
  Play, 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Filter,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { GigItem, Category } from '../types';

interface ShowcaseSectionProps {
  gigs: GigItem[];
  onSelectGig: (gig: GigItem) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ gigs, onSelectGig }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Graphics Design', 'Video Editing', 'AI Projects'];

  const filteredGigs = useMemo(() => {
    if (activeCategory === 'All') return gigs;
    return gigs.filter(g => g.category === activeCategory);
  }, [gigs, activeCategory]);

  return (
    <section id="showcase" className="py-24 relative overflow-hidden bg-black/40">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers size={14} />
              <span>FREELANCING GIGS & SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-gray-900">
              Featured Work & <span className="font-serif-instrument italic font-normal text-gradient-emerald">Live Demos</span>
            </h2>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm sm:text-base">
              Explore recent graphics designs, viral video edits, and generative AI concept productions. Click any card to preview media or order.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] dark:bg-white/[0.03] light:bg-black/[0.04] p-1.5 rounded-2xl border border-white/10 dark:border-white/10 light:border-black/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGigs.map((gig) => {
            const isVideo = gig.mediaType === 'video';

            return (
              <div
                key={gig.id}
                className="group relative bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Thumbnail Container */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
                  onClick={() => onSelectGig(gig)}
                >
                  <img
                    src={gig.thumbnailUrl || gig.mediaUrl}
                    alt={gig.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                      {isVideo ? <Play size={11} className="fill-emerald-400" /> : <ImageIcon size={11} />}
                      <span>{gig.category}</span>
                    </span>
                  </div>

                  {/* Duration Tag if video */}
                  {gig.duration && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-white border border-white/10">
                        {gig.duration}
                      </span>
                    </div>
                  )}

                  {/* Center Play/Inspect Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      {isVideo ? <Play size={24} className="fill-white ml-0.5" /> : <Eye size={24} />}
                    </div>
                  </div>

                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => onSelectGig(gig)}
                      className="text-lg font-bold text-white dark:text-white light:text-gray-900 group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {gig.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {gig.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {gig.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-gray-300 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-white/10 dark:border-white/10 light:border-black/5 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectGig(gig)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Preview Demo</span>
                      <Eye size={13} />
                    </button>

                    <a
                      href={gig.fiverrUrl || "https://www.fiverr.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white text-xs font-semibold shadow-sm transition-transform active:scale-95"
                    >
                      <span>Order on Fiverr</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {filteredGigs.length === 0 && (
          <div className="text-center py-16 bg-white/[0.02] border border-white/10 rounded-3xl">
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
