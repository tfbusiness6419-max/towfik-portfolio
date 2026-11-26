import React from 'react';
import { X, ExternalLink, Play, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import { GigItem } from '../types';

interface MediaModalProps {
  gig: GigItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ gig, onClose }) => {
  if (!gig) return null;

  // Helper to extract YouTube embed URL if applicable
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = gig.mediaType === 'video' ? getEmbedUrl(gig.mediaUrl) : null;
  const isDirectVideo = gig.mediaType === 'video' && !embedUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#0d0e12] dark:bg-[#0d0e12] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 text-white dark:text-white light:text-gray-900 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 dark:border-white/10 light:border-black/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {gig.category}
            </span>
            {gig.duration && (
              <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                ⏱ {gig.duration}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Media Player / Viewer Viewport */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[580px] overflow-hidden">
          {gig.mediaType === 'video' ? (
            embedUrl ? (
              <iframe
                src={embedUrl}
                title={gig.title}
                className="w-full aspect-video border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isDirectVideo ? (
              <video
                src={gig.mediaUrl}
                controls
                autoPlay
                playsInline
                className="max-h-[560px] w-auto max-w-full rounded-md shadow-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="p-8 text-center">
                <Play size={48} className="mx-auto text-emerald-400 mb-3" />
                <p className="text-sm text-gray-300">Video source URL configured</p>
                <a 
                  href={gig.mediaUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-400 underline"
                >
                  Open video externally <ExternalLink size={12} />
                </a>
              </div>
            )
          ) : (
            <img
              src={gig.mediaUrl || gig.thumbnailUrl}
              alt={gig.title}
              className="max-h-[560px] w-auto max-w-full object-contain mx-auto transition-transform duration-300"
            />
          )}
        </div>

        {/* Content Info & Actions */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-white dark:text-white light:text-gray-900">
              {gig.title}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed text-sm sm:text-base">
              {gig.description}
            </p>
          </div>

          {/* Tools & Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 dark:border-white/10 light:border-black/5">
            {gig.toolsUsed && gig.toolsUsed.length > 0 && (
              <div className="flex items-center gap-1.5 mr-4 text-xs font-mono text-emerald-400">
                <Sparkles size={14} />
                <span>Tools: {gig.toolsUsed.join(', ')}</span>
              </div>
            )}
            
            {gig.tags && gig.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md bg-white/5 dark:bg-white/5 light:bg-gray-100 text-gray-300 dark:text-gray-300 light:text-gray-600 border border-white/5 flex items-center gap-1"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 dark:border-white/10 light:border-black/5">
            <div className="text-xs text-gray-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Customized for client requirements • Fast turnaround</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={gig.fiverrUrl || "https://www.fiverr.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white font-semibold text-sm shadow-lg shadow-[#1dbf73]/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Hire / Order on Fiverr</span>
                <ExternalLink size={15} />
              </a>

              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-sm font-medium transition-colors"
              >
                <span>Inquire Directly</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
