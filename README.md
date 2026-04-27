# Personal Portfolio Website

A fully custom personal portfolio built with Next.js, featuring a 3D avatar, animated UI, interactive sections, and a clean data-driven architecture.

**Live site:** [Rojin Lohrasbinejad]([https://rojinlohrasbinejad.vercel.app])

---

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D:** Three.js (via React Three Fiber)
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/                  # Next.js app router (layout, page)
├── components/
│   ├── layout/           # Navbar, Footer, BackgroundScene
│   ├── sections/         # Page sections (Hero, About, Experience, etc.)
│   ├── three/            # 3D components (GirlAvatar, GlowingSphere)
│   └── ui/               # Reusable UI primitives (GlassCard, Pill, Section)
├── data/
│   └── portfolio.ts      # Single source of truth for all content
└── lib/
    ├── motion.ts         # Shared Framer Motion variants
    └── utils.ts          # Utility helpers
```

## Content

All site content lives in `src/data/portfolio.ts` — name, bio, experience, projects, skills, and links. Editing that file updates the entire site.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic redeployment.
