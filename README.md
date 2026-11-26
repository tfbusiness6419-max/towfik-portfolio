# Towfik Ahmmed — Personal Portfolio & Freelancing Showcase

A complete, responsive personal portfolio and freelancing showcase website built for **Towfik Ahmmed** (Graphics Designer, Video Editor & AI Content Creator based in Naogaon, Rajshahi, Bangladesh).

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Lenis Smooth Scroll**, **GSAP**, and **Firebase (Auth & Firestore)**.

---

## 🌟 Key Features

1. **Hero & Identity**
   - Features Towfik's genuine professional portrait (`/images/towfik.jpg`), high-impact typography with **Instrument Serif** and **Geist**, and interactive glassmorphic badges.
   - Live status indicator: *"Available for Freelance & Fiverr Gigs"*.
   - Location tag: *Naogaon, Rajshahi, Bangladesh*.
   - Direct CTA buttons: *Explore Work & Gigs*, *Order on Fiverr*, *Contact Me*.
   - Animated marquee ribbon highlighting skills (*Canva Pro, CapCut, Premiere, Photoshop, Midjourney, High-CTR Thumbnails*).

2. **Bio-Data & Verified Details Section**
   - **Personal & Bio Details**: Full Name (*MD TOWFIK AHMMED*), Date of Birth, permanent/present address (*Dashkandi, Aledadpur, Naogaon Sadar, Rajshahi - 6500, Bangladesh*), career objective, and languages known.
   - **Core Skills & Competencies**: Interactive proficiency meters for Graphics Design, Video Editing (CapCut/Premiere), and AI Content Generation (Midjourney/ElevenLabs/Runway).
   - **Academic & Qualifications**: Timeline displaying Diploma in Agriculture (ATI Gaibandha, CGPA 3.34), SSC Science (GPA 4.56), JSC (GPA 3.93), and practical technical training.
   - **Software & Tools Stack**: Interactive toolcards for Canva, CapCut, Photoshop, Premiere Pro, Midjourney, ChatGPT, ElevenLabs, and Figma.
   - Quick one-click copy buttons for Email (`mdtowfikahmmed@gmail.com`) and Phone (`+8801303686239`).

3. **Freelancing Gigs & Demo Showcase (Images & Videos)**
   - Category filtering: **All**, **Graphics Design**, **Video Editing**, and **AI Projects**.
   - Responsive cards with media badges, video duration markers, and hover inspection effects.
   - **Interactive Media Modal**: Click any item to view high-resolution imagery or play videos directly (supporting native MP4 video playback as well as YouTube embed players). Includes direct Fiverr order links.

4. **Freelance Packages & Offerings**
   - Turnaround-ready service cards: Viral TikTok/Reels Editing, High-CTR YouTube Thumbnails, Canva Social Media Branding Kits, and AI Commercial Visuals with clear deliverables and pricing.

5. **Direct Contact Section with Confetti**
   - Direct communication channels: Email, Phone/WhatsApp, Fiverr profile, and Naogaon timezone guide.
   - Interactive inquiry form that launches celebratory confetti and prepares a project brief.

6. **Secret Admin Panel (Firebase Auth + Cloud Firestore)**
   - **Discreet Access**: Subtle *"Admin"* link in the footer or instant keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> (or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> on macOS).
   - **Firebase Authentication**: Email/Password authentication.
   - **Zero-Setup Demo Fallback**: Works immediately out-of-the-box before adding Firebase keys using local persistence. Demo credentials:
     - **Email:** `mdtowfikahmmed@gmail.com`
     - **Password:** `admin123`
   - **Gig Management**: Add new showcase items (Title, Category, Description, Media Type, Media URL, Thumbnail URL, Fiverr Link, Tags) and delete existing items.
   - **Bio-Data Editor**: Live updates to Name, Headline, Bio, Objective, Location, and Links.
   - **Cloud Sync**: When `.env` is populated with your Firebase project keys, it seamlessly synchronizes with Google Cloud Firestore (`gigs` collection and `settings/biodata` document).

---

## 🚀 Running the Project

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```
Creates an optimized production build in `dist/` with zero TypeScript errors.

---

## ⚙️ Connecting Live Firebase (Optional)

To connect your own Google Cloud Firebase project:

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Email/Password** under *Authentication > Sign-in method*.
3. Enable **Cloud Firestore** under *Build > Firestore Database*.
4. Create a `.env` file in the project root based on `.env.example`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

The app will automatically detect the credentials and switch from local demo storage to live Cloud Firestore syncing!
