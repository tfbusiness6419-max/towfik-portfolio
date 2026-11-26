import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  GraduationCap, 
  Award, 
  CheckCircle, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Briefcase, 
  Calendar,
  Layers,
  Palette,
  Video,
  Cpu
} from 'lucide-react';
import { BioData } from '../types';

interface BioDataSectionProps {
  bioData: BioData;
}

export const BioDataSection: React.FC<BioDataSectionProps> = ({ bioData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'education' | 'tools'>('overview');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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
    <section id="biodata" className="py-24 relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <User size={14} />
            <span>BIO-DATA & VERIFIED BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-gray-900">
            About <span className="font-serif-instrument italic font-normal text-gradient-emerald">Towfik Ahmmed</span>
          </h2>
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base sm:text-lg">
            Dedicated digital creator blending hands-on discipline, graphic aesthetics, video pacing, and modern generative AI tools.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'overview', label: 'Personal & Bio Details', icon: User },
            { id: 'skills', label: 'Core Skills & Competencies', icon: Layers },
            { id: 'education', label: 'Academic & Qualifications', icon: GraduationCap },
            { id: 'tools', label: 'Software & Tools Stack', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]' 
                    : 'bg-white/5 dark:bg-white/5 light:bg-black/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Overview & Personal Bio Details */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            
            {/* Left Card: Summary & Career Objective */}
            <div className="lg:col-span-7 bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Creative Journey & Freelance Focus</span>
                </span>
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">
                  Visual Storyteller from Naogaon, Bangladesh
                </h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed text-sm sm:text-base">
                  {bioData.summary}
                </p>
              </div>

              {/* Career Objective Box */}
              <div className="bg-white/[0.03] dark:bg-white/[0.03] light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-black/5 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                  <Briefcase size={14} />
                  <span>CAREER OBJECTIVE</span>
                </div>
                <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 italic leading-relaxed">
                  "{bioData.objective}"
                </p>
              </div>

              {/* Location & Cultural Roots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <span className="text-xs font-mono text-gray-400 block mb-1">Present & Permanent Address</span>
                  <p className="text-sm font-semibold text-white dark:text-white light:text-gray-900">
                    Dashkandi, Aledadpur, Naogaon Sadar, Rajshahi - 6500, Bangladesh
                  </p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <span className="text-xs font-mono text-gray-400 block mb-1">Languages Known</span>
                  <p className="text-sm font-semibold text-white dark:text-white light:text-gray-900">
                    Bengali (Native) • English (Professional Working)
                  </p>
                </div>
              </div>

            </div>

            {/* Right Card: Structured Personal Bio Table */}
            <div className="lg:col-span-5 bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900 border-b border-white/10 pb-4">
                Structured Bio-Data
              </h3>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400 font-mono text-xs">Full Name</span>
                  <span className="font-semibold text-white dark:text-white light:text-gray-800">{bioData.fullName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400 font-mono text-xs">Date of Birth</span>
                  <span className="font-medium text-white dark:text-white light:text-gray-800">December 24, 1998</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400 font-mono text-xs">Nationality</span>
                  <span className="font-medium text-white dark:text-white light:text-gray-800">Bangladeshi</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400 font-mono text-xs">District</span>
                  <span className="font-medium text-white dark:text-white light:text-gray-800">Naogaon, Rajshahi</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400 font-mono text-xs">Available For</span>
                  <span className="font-medium text-emerald-400">Freelance, Client Gigs & Remote</span>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="pt-4 space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2.5 truncate">
                    <Mail size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-xs font-mono text-gray-200 truncate">{bioData.email}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bioData.email, 'email')}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2.5 truncate">
                    <Phone size={16} className="text-cyan-400 shrink-0" />
                    <span className="text-xs font-mono text-gray-200 truncate">{bioData.phone}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bioData.phone, 'phone')}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check size={14} className="text-cyan-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab Content 2: Core Skills & Competencies */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {bioData.skills.map((skillGroup, idx) => {
              const icons = [Palette, Video, Cpu];
              const Icon = icons[idx % icons.length];
              return (
                <div 
                  key={skillGroup.category}
                  className="bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                      {skillGroup.category}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {skillGroup.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {skillGroup.items.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className={`font-medium ${skill.highlight ? 'text-emerald-400 font-semibold' : 'text-gray-300 dark:text-gray-300 light:text-gray-700'}`}>
                            {skill.name}
                          </span>
                          <span className="font-mono text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              skill.highlight 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                                : 'bg-gradient-to-r from-gray-500 to-gray-400'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content 3: Academic & Qualifications */}
        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <GraduationCap className="text-emerald-400" size={28} />
              <div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900">
                  Academic Timeline & Certifications
                </h3>
                <p className="text-xs text-gray-400">
                  Educational credentials and formal training completed in Bangladesh
                </p>
              </div>
            </div>

            <div className="relative border-l-2 border-emerald-500/30 pl-6 sm:pl-8 space-y-8 ml-2 sm:ml-4">
              {bioData.education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-emerald-400 group-hover:scale-125 transition-transform" />
                  
                  <div className="space-y-1.5 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {edu.year}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {edu.result}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white dark:text-white light:text-gray-900">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      Major / Focus: {edu.subject}
                    </p>
                  </div>
                </div>
              ))}

              {/* Specialization / Practical Training Item */}
              <div className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-cyan-400 group-hover:scale-125 transition-transform" />
                <div className="space-y-1.5 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      2017 (6 Months)
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      Completed
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white dark:text-white light:text-gray-900">
                    Practical Technical & Computer Operations Training
                  </h4>
                  <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700">
                    Agriculture Training Institute, Bangla bazaar, Gaibandha
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    Computer applications, data management, people communication & organizational workflows.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab Content 4: Software & Tools Stack */}
        {activeTab === 'tools' && (
          <div className="max-w-4xl mx-auto bg-[#0e1014] dark:bg-[#0e1014] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900">
                Tools & Technologies I Work With Daily
              </h3>
              <p className="text-sm text-gray-400">
                Every asset, video, and design is crafted with industry-standard software and generative AI models.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-4">
              {bioData.tools.map((tool) => (
                <div 
                  key={tool}
                  className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.06] transition-all duration-200 group text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm mb-3 group-hover:scale-110 transition-transform">
                    {tool.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-white dark:text-white light:text-gray-800">
                    {tool}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono mt-1">
                    Production Ready
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
