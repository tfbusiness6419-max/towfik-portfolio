import React from 'react';
import { 
  Briefcase, 
  Check, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { BioData } from '../types';

interface ServicesSectionProps {
  bioData: BioData;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ bioData }) => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap size={14} />
            <span>FIVERR & CLIENT OFFERINGS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-gray-900">
            Freelancing <span className="font-serif-instrument italic font-normal text-gradient-emerald">Gig Packages</span>
          </h2>
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm sm:text-base">
            Turnaround-ready creative services designed to boost your channel metrics, brand aesthetics, and content marketing conversions.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bioData.services.map((service, idx) => (
            <div
              key={service.id}
              className={`relative bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                idx === 0 
                  ? 'border-emerald-500/50 shadow-emerald-500/10 ring-1 ring-emerald-500/20' 
                  : 'border-white/10 dark:border-white/10 light:border-black/10 hover:border-white/20'
              }`}
            >
              {idx === 0 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-mono font-bold px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles size={11} />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    {service.category}
                  </span>
                  {service.startingPrice && (
                    <span className="text-lg font-bold font-mono text-white dark:text-white light:text-gray-900">
                      From {service.startingPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Turnaround Badge */}
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                  <Clock size={13} className="text-cyan-400" />
                  <span>Delivery: {service.deliveryTime}</span>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  <span className="text-xs font-mono uppercase text-gray-400 block">Deliverables:</span>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300 dark:text-gray-300 light:text-gray-700">
                      <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Action Button */}
              <div className="pt-6">
                <a
                  href={service.fiverrLink || bioData.fiverrUrl || "https://www.fiverr.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white text-xs font-semibold shadow-md shadow-[#1dbf73]/20 transition-all"
                >
                  <span>Book Gig on Fiverr</span>
                  <ExternalLink size={13} />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Custom Order Callout */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950/40 via-[#0e1014] to-cyan-950/40 border border-emerald-500/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need a Custom Bundle or Long-Term Editing Retainer?
            </h3>
            <p className="text-sm text-gray-300 max-w-xl">
              I collaborate with content creators, agencies, and businesses on ongoing weekly YouTube edits, daily TikTok shorts, and brand marketing campaigns.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg shrink-0"
          >
            <span>Message Directly</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};
