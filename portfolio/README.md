# 🍃 Nature & Sticky-Notes Portfolio (Next.js)

A unique, beautifully structured portfolio website built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**. Designed around a calming nature / deep forest aesthetic paired with tactile, colorful pastel sticky notes, pushpins, and washi-tape decorators.

---

## 🌟 Included Features & Sections

1. **Hero Section**:
   - Your name prominently displayed.
   - One-line impactful introduction.
   - Two primary action buttons: **View My Projects** and **Leave a Note / Contact Me** (plus CV link).
   - Live availability status pill.

2. **About Me**:
   - Polaroid-style framed photo with taped corners and handwritten caption.
   - Short engaging bio, core working principles, and offline hobbies.

3. **Real-Time Projects Built**:
   - Pinned project sticky notes with real-time badges (e.g., *Sub-50ms WebSocket Broadcasts*, *Real-Time MQTT Sensor Stream*).
   - Tech stack tags, Live Demo buttons, and GitHub repository links.
   - Interactive filtering by project type.

4. **Skills, Currently Learning & Aspirations**:
   - **Skill Levels**: Visual paper progress bars with mastery indicators (*Frontend*, *Backend & Systems*, *DevOps/Cloud*).
   - **Currently Learning**: Active topics with status badges (*Rust*, *Autonomous AI Agents*, *WebGL Shaders*).
   - **Future Aspirations**: Clear mission statements and North Star goals.

5. **Where I Studied (Education Timeline)**:
   - Visual vertical vine timeline with leaf nodes.
   - Sticky notes for each institution, degree, years, and key academic achievements.

6. **Contact & Social Accounts**:
   - Direct cards for GitHub, LinkedIn, Twitter/X, Email, and Discord.
   - Interactive "Stick a Note on My Board" form allowing visitors to pick note paper colors and leave messages.

---

## 🚀 Getting Started

### 1. Install Dependencies
Open your PowerShell or Terminal in this folder (`c:\Users\Vinod A\Documents\university\portfolio`):

```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 How to Customize Your Details

All your content is cleanly centralized in a single file:
👉 **`src/data/portfolioData.ts`**

Simply open `src/data/portfolioData.ts` to customize:
- `personal.name` &rarr; Your full name
- `personal.oneLinerIntro` &rarr; Your one-sentence hook
- `personal.shortBio` &rarr; Your bio paragraph
- `personal.avatarUrl` &rarr; Path to your photo (or place an image in `public/` and reference `/my-photo.jpg`)
- `projects` &rarr; Add your real-time apps, URLs, and tech stacks
- `skillCategories` &rarr; Adjust your skills & percentages (0 - 100%)
- `learningAndAspirations` &rarr; What you are learning and dreaming of
- `educationTimeline` &rarr; Your school, college, degree, and milestones
- `socialLinks` &rarr; Your usernames and profile links

---

## 📦 Deployment

You can deploy this portfolio for free in 1-click on [Vercel](https://vercel.com):
```bash
npx vercel
```
Or connect your GitHub repository to Vercel for automatic deployments on push.
