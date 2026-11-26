export type Category = 'All' | 'Graphics Design' | 'Video Editing' | 'AI Projects';

export interface GigItem {
  id: string;
  title: string;
  category: 'Graphics Design' | 'Video Editing' | 'AI Projects';
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string; // Direct image URL or YouTube/embed or video mp4
  thumbnailUrl: string;
  fiverrUrl?: string;
  tags: string[];
  featured?: boolean;
  duration?: string; // for videos (e.g., '0:45', '1:20')
  toolsUsed?: string[];
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  createdAt?: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  items: {
    name: string;
    level: number; // percentage
    highlight?: boolean;
  }[];
}

export interface EducationItem {
  degree: string;
  subject: string;
  institution: string;
  year: string;
  result: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: 'Graphics Design' | 'Video Editing' | 'AI Projects';
  description: string;
  deliverables: string[];
  fiverrLink?: string;
  deliveryTime: string;
  startingPrice?: string;
}

export interface BioData {
  fullName: string;
  displayName: string;
  title: string;
  headline: string;
  summary: string;
  objective: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  fiverrUrl: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  profileImage: string;
  statusText: string;
  experienceYears: string;
  projectsCompleted: string;
  happyClientsRate: string;
  skills: SkillCategory[];
  tools: string[];
  education: EducationItem[];
  services: ServicePackage[];
}
