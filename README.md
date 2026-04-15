# Anthony Penwright — Profile Site

High-fidelity editorial profile / CV site. Next.js 14 · TypeScript · Tailwind · framer-motion.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Before deploying — quick checklist

1. **Drop your headshot** at `/public/anthony.jpg` (square, 800×800 or larger, will be circle-cropped).
2. **Drop your CV PDF** at `/public/anthony-penwright-cv.pdf` — the "Download CV" buttons link here.
3. **Update the LinkedIn URL** in `src/content/profile.ts` (look for the `linkedin` field — currently a TODO placeholder).
4. (Optional) edit any copy — all content lives in `src/content/` as typed TypeScript data. No CMS, no database.

## Deploy to Vercel

Easiest path:

```bash
npx vercel
```

Or import the repo at https://vercel.com/new and accept defaults (Next.js auto-detected). Vercel will give you a `*.vercel.app` subdomain; add a custom domain later from the project settings.

## Content structure

```
src/content/
  profile.ts      # name, pitch, bio, stats, value pillars, signature moments,
                  # credentials, competencies, contact info
  frameworks.ts   # the four advisory frameworks
  timeline.ts    # full career timeline
```

Each section is a React component under `src/components/sections/` that reads from those data files.
