import { BioData, GigItem } from '../types';

export const INITIAL_BIO_DATA: BioData = {
  fullName: "MD TOWFIK AHMMED",
  displayName: "Towfik Ahmmed",
  title: "Graphics Designer, Video Editor & AI Content Creator",
  headline: "Crafting High-Impact Visuals, Engaging Edits & AI-Powered Workflows for Global Brands & Creators.",
  summary: "Creative digital artist and visual storyteller from Naogaon, Rajshahi, Bangladesh. I specialize in eye-catching graphics design, social media branding, dynamic video editing with CapCut and Premiere Pro, and cutting-edge generative AI workflows. Currently gearing up for client engagements and Fiverr freelancing gigs.",
  objective: "To deliver standout visual assets, branding, and video content that elevate brands, maximize viewer retention, and drive results through modern design and generative AI.",
  location: "Naogaon Sadar, Rajshahi - 6500, Bangladesh",
  email: "mdtowfikahmmed@gmail.com",
  phone: "+8801303686239",
  whatsapp: "https://wa.me/8801303686239",
  fiverrUrl: "https://www.fiverr.com",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com",
  profileImage: "/images/towfik.jpg",
  statusText: "Available for Freelance & Fiverr Gigs",
  experienceYears: "3+",
  projectsCompleted: "80+",
  happyClientsRate: "100%",
  skills: [
    {
      category: "Graphics Design & Branding",
      description: "Visual identity, social media banners, marketing collateral & YouTube thumbnails.",
      items: [
        { name: "Canva Pro Design", level: 95, highlight: true },
        { name: "Social Media Posts & Ad Banners", level: 92, highlight: true },
        { name: "YouTube Thumbnails & Channel Art", level: 94, highlight: true },
        { name: "Adobe Photoshop & Photo Retouching", level: 86 },
        { name: "Adobe Illustrator & Vector Assets", level: 80 },
        { name: "Flyers, Posters & Business Cards", level: 88 }
      ]
    },
    {
      category: "Video Editing & Motion",
      description: "Fast-paced TikTok/Reels/Shorts, corporate explainers, YouTube long-form, and captions.",
      items: [
        { name: "CapCut Pro (PC & Mobile)", level: 96, highlight: true },
        { name: "Short-Form Video (Reels/TikTok/Shorts)", level: 95, highlight: true },
        { name: "Adobe Premiere Pro", level: 85 },
        { name: "Color Grading & Audio Enhancement", level: 88 },
        { name: "Dynamic Captions & Motion Graphics", level: 92, highlight: true },
        { name: "B-Roll Sync & Sound Design", level: 90 }
      ]
    },
    {
      category: "AI Content & Automation",
      description: "Harnessing Midjourney, Stable Diffusion, ChatGPT & voice synthesis for next-gen workflows.",
      items: [
        { name: "AI Image Generation (Midjourney/Flux)", level: 94, highlight: true },
        { name: "Generative AI Video Workflows", level: 90, highlight: true },
        { name: "Prompt Engineering & Visual Direction", level: 92 },
        { name: "AI Voiceover Integration (ElevenLabs)", level: 90 },
        { name: "Automated Content Production", level: 85 }
      ]
    }
  ],
  tools: [
    "Canva Pro",
    "CapCut Desktop",
    "Adobe Photoshop",
    "Adobe Premiere Pro",
    "Midjourney",
    "ChatGPT",
    "ElevenLabs",
    "RunwayML",
    "Illustrator",
    "Figma"
  ],
  education: [
    {
      degree: "Diploma in Agriculture (DiA)",
      subject: "Agriculture & Science",
      institution: "Agriculture Training Institute, Banglabazar, Gaibandha",
      year: "2017",
      result: "CGPA 3.34 / 4.00"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      subject: "Science",
      institution: "Paharput G.M High School",
      year: "2013",
      result: "GPA 4.56 / 5.00"
    },
    {
      degree: "Junior School Certificate (JSC)",
      subject: "General",
      institution: "Paharput G.M High School",
      year: "2010",
      result: "GPA 3.93 / 5.00"
    }
  ],
  services: [
    {
      id: "srv-1",
      title: "Viral TikTok, Reels & YouTube Shorts Editing",
      category: "Video Editing",
      description: "High-retention vertical video editing packed with modern hook captions, sound effects, zoom-ins, and B-roll to boost watch time.",
      deliverables: ["1080x1920 60FPS Render", "Animated Subtitles & Emojis", "Sound Design & B-Roll", "Source File"],
      deliveryTime: "24-48 Hours",
      startingPrice: "$15",
      fiverrLink: "https://www.fiverr.com"
    },
    {
      id: "srv-2",
      title: "High-CTR YouTube Thumbnails & Banners",
      category: "Graphics Design",
      description: "Custom eye-catching thumbnails engineered for maximum Click-Through Rate (CTR) using psychology, high-contrast grading, and clear typography.",
      deliverables: ["Full HD 1920x1080 Thumbnail", "A/B Testing Variants", "PSD / Canva Editable File", "Unlimited Revisions"],
      deliveryTime: "12-24 Hours",
      startingPrice: "$10",
      fiverrLink: "https://www.fiverr.com"
    },
    {
      id: "srv-3",
      title: "Canva Social Media Branding Kit",
      category: "Graphics Design",
      description: "Complete cohesive social media brand templates for Instagram, Facebook, and LinkedIn so your feeds look polished and professional.",
      deliverables: ["10 Custom Post Templates", "5 Story/Reel Covers", "Brand Color & Typography Guide", "Direct Canva Share Links"],
      deliveryTime: "2-3 Days",
      startingPrice: "$30",
      fiverrLink: "https://www.fiverr.com"
    },
    {
      id: "srv-4",
      title: "AI Video Creation & Concept Art Generation",
      category: "AI Projects",
      description: "End-to-end AI generated video ads, photorealistic commercial product scenes, and cinematic concept illustrations using Midjourney and Runway.",
      deliverables: ["4K High-Res AI Images", "Short AI Video Sequences", "Custom Prompt Sets", "Commercial Usage Rights"],
      deliveryTime: "2 Days",
      startingPrice: "$25",
      fiverrLink: "https://www.fiverr.com"
    }
  ]
};

export const INITIAL_GIGS: GigItem[] = [
  {
    id: "gig-1",
    title: "High-Retention CapCut Shorts & Reels Editing",
    category: "Video Editing",
    description: "Engaging short-form video edit featuring fast-paced zooms, dynamic animated subtitles, sound effects, and seamless transitions tailored for Instagram Reels and TikTok viral growth.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-working-on-his-computer-42861-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["CapCut", "Reels", "TikTok", "Shorts", "Subtitles"],
    featured: true,
    duration: "0:30",
    toolsUsed: ["CapCut Pro", "Premiere Pro", "Photoshop"],
    aspectRatio: "portrait"
  },
  {
    id: "gig-2",
    title: "High CTR YouTube Thumbnail & Banner Suite",
    category: "Graphics Design",
    description: "Eye-popping YouTube thumbnails designed with expressive facial cutouts, 3D typography, vibrant glow effects, and curiosity triggers that drive 12%+ CTR.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["Canva", "Photoshop", "YouTube Thumbnail", "CTR Design"],
    featured: true,
    toolsUsed: ["Canva Pro", "Photoshop CC"],
    aspectRatio: "landscape"
  },
  {
    id: "gig-3",
    title: "Cinematic AI Cyberpunk Visuals & Concept Art",
    category: "AI Projects",
    description: "Ultra-detailed conceptual world-building generated through advanced Midjourney v6 prompting, refined with Photoshop color balancing and upscaling for commercial campaign branding.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["Midjourney", "AI Art", "Prompt Engineering", "Concept Art"],
    featured: true,
    toolsUsed: ["Midjourney", "Upscayl", "Photoshop"],
    aspectRatio: "landscape"
  },
  {
    id: "gig-4",
    title: "Modern E-Commerce Social Media Ad Creatives",
    category: "Graphics Design",
    description: "Clean, conversion-optimized Instagram carousel and story ads for retail and digital products, with bold typography, benefit callouts, and distinctive brand aesthetics.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["Canva", "Social Media", "Facebook Ads", "Instagram"],
    featured: false,
    toolsUsed: ["Canva Pro", "Illustrator"],
    aspectRatio: "square"
  },
  {
    id: "gig-5",
    title: "Dynamic Podcast & Talk Show Video Highlights",
    category: "Video Editing",
    description: "Multi-cam podcast clip editing featuring speaker auto-tracking, sound-reactive wave visualizers, headline hooks, and crisp sound cleanup.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-recording-a-video-41712-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["Podcast Clips", "CapCut", "Audio Sync", "Subtitles"],
    featured: true,
    duration: "0:45",
    toolsUsed: ["CapCut", "Premiere Pro"],
    aspectRatio: "portrait"
  },
  {
    id: "gig-6",
    title: "AI Commercial Product Mockups & Video Sequence",
    category: "AI Projects",
    description: "Photorealistic AI product photography replacing expensive studio setups with high-end digital renderings, accompanied by smooth camera fly-through sequences.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["AI Video", "Runway Gen-2", "Product Mockup", "3D Render"],
    featured: false,
    duration: "0:25",
    toolsUsed: ["Midjourney", "RunwayML", "CapCut"],
    aspectRatio: "landscape"
  },
  {
    id: "gig-7",
    title: "Brand Identity Design & Logo Concept Guide",
    category: "Graphics Design",
    description: "Minimalist vector brand logos, typography pairings, and complete brand color schemes prepared for digital, print, and merchandise applications.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=85",
    thumbnailUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["Branding", "Logo Design", "Identity", "Vector"],
    featured: false,
    toolsUsed: ["Canva", "Illustrator", "Photoshop"],
    aspectRatio: "landscape"
  },
  {
    id: "gig-8",
    title: "YouTube Documentaries & Storytelling Video Montage",
    category: "Video Editing",
    description: "Cinematic montage with pacing control, archival footage integration, historical map animations, and immersive ambient soundscapes.",
    mediaType: "video",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-camera-moving-around-a-photographer-42862-large.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    fiverrUrl: "https://www.fiverr.com",
    tags: ["YouTube Video", "Storytelling", "Color Grading", "Premiere"],
    featured: true,
    duration: "1:15",
    toolsUsed: ["Premiere Pro", "CapCut", "Audition"],
    aspectRatio: "landscape"
  }
];
