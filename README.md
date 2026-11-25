# Personal Portfolio Website

A retro, game-menu styled portfolio: dark background, pink accents, pixel fonts and early-2000s console UI touches (title screen, channel menu, quest log, save files, inventory).

**Live site:** [Rojin Lohrasbinejad](https://rojinlohrasbinejad.vercel.app)

---

## Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS v4 + a few hand-written retro primitives in `globals.css`
- **Fonts:** Press Start 2P (headings), VT323 (terminal text), Nunito (body)
- **Art:** original pixel sprites drawn as SVG from text grids (`src/components/ui.tsx`, `Avatar.tsx`)

## Project Structure

```
src/
├── app/            # layout, page, globals.css (theme tokens + retro primitives)
├── components/     # Hud, TitleScreen, MenuGrid, Sections, PartySelect, Clock, Avatar, ui
└── data/
    └── portfolio.ts  # all site content
```

## Content

All content lives in `src/data/portfolio.ts`. Lines marked `[GUESS]` were filled in during the redesign and should be double-checked.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic redeployment.
