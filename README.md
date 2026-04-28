# Beyond Belief BPO — Next.js Site

Production-ready Next.js 14 + TypeScript + Tailwind starter for **beyondbeliefbpo.co**, recovered from the database export and rebuilt in the original **black / white / red** brand palette.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom design tokens)
- **Framer Motion** (installed, ready to use)
- **Lucide React** (icons)
- **Google Fonts**: Fraunces (display, variable) + Inter Tight (body)

## Design tokens

Defined in `tailwind.config.ts`:

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0A0A` | Black — dark backgrounds, body text |
| `ink.softer` | `#141414` | Card hover states |
| `paper` | `#FFFFFF` | White — light section backgrounds |
| `paper.softer` | `#F8F8F8` | Alternating sections |
| `crimson` | `#DC2626` | Red accent — buttons, italic emphasis, marquee |
| `crimson.deep` | `#991B1B` | Pressed/hover states |
| `muted` | `#737373` | Secondary text |

Typography utilities in `app/globals.css`:
- `.headline` — Fraunces display with optical sizing
- `.headline-italic` — italic variant for emphasized words (in red)
- `.eyebrow` — small all-caps label
- `.body-text` — Inter Tight body

## Pages

- `/` — Home (hero, **red marquee**, services, US entity, team teaser)
- `/about` — About (intro, three pillars, mission/vision/results, US entity)
- `/team` — Team (sections with placeholder photo grid)
- `/careers` — Careers (4 open positions, hover-flip rows)
- `/gallery` — Gallery (placeholder masonry-ish grid)
- `/contact` — Contact (form + info)

## Get started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial Beyond Belief BPO rebuild"
git remote add origin <your-github-repo>
git push -u origin main

# 2. Import on Vercel
# - Visit https://vercel.com/new
# - Select your repo
# - Click Deploy (no config needed — Next.js auto-detected)
```

## Things you'll want to customize

### 1. Real photos
Currently using "Photo placeholder" boxes. Drop your recovered images into `/public/images/` and update:
- `app/page.tsx` — Team teaser section
- `app/team/page.tsx` — Team member cards
- `app/gallery/page.tsx` — Gallery grid

The 45 real images from the database recovery are documented in your separate `beyondbeliefbpo-images.md` reference. The Z62_xxxx series is the professional photoshoot from November 2023.

### 2. Contact form backend
`app/contact/page.tsx` has a working form UI but the submit handler is currently a stub. Wire it to one of:
- **Supabase**: Insert into a `contact_submissions` table
- **Resend**: Send email to `info@beyondbeliefbpo.co`
- **Vercel Form** or **Formspark** for no-backend simplicity

### 3. Real social media URLs
Currently `href="#"` in the footer and contact page. Update to actual social URLs.

### 4. Team member names + photos
The recovered data shows generic placeholders ("xyz") for most team members except CEO Faisal. Get the current team list from the client.

### 5. Video hero (optional)
The original site had a video hero (`Pexels-Videos-2830.mp4`). To re-add:
- Drop video into `/public/hero.mp4`
- Add `<video>` element to the homepage hero section

## Adjusting the red intensity

The site uses red sparingly for high impact — currently in:
- Italic emphasis words ("*Belief*", "*Us*", "*Excellence*")
- The marquee strip (full red bg)
- Eyebrow labels above section titles
- Button hover states

To use more red, swap `bg-paper` sections to `bg-crimson` or use `bg-crimson` for callout cards. To use less, change italic text colors from `text-crimson` to `text-ink`.

## File structure

```
beyondbeliefbpo/
├── app/
│   ├── about/page.tsx
│   ├── careers/page.tsx
│   ├── contact/page.tsx
│   ├── gallery/page.tsx
│   ├── team/page.tsx
│   ├── globals.css        ← design system + buttons
│   ├── layout.tsx         ← fonts + nav + footer
│   └── page.tsx           ← Home
├── components/
│   ├── Footer.tsx
│   └── Nav.tsx
├── public/                ← drop images here
├── lib/                   ← future utilities (Supabase client, etc.)
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Design notes

Black, white, and red is a classic high-impact palette — used by Wired magazine, Supreme, Russian constructivist posters, and countless premium brands. It signals confidence, urgency, and authority — perfectly fitting for a BPO + USA medical supplies company.

This rebuild keeps the bold spirit of the original WordPress site (which used the BoxKing Elementor demo as its base — also dark and aggressive) but elevates it with:

- **Variable serif headlines** — Fraunces with italic emphasis on key brand words
- **Subtle film-grain texture** — adds depth without visual noise
- **Generous whitespace** — premium feel, never cramped
- **Marquee red strip** — the one moment of full color saturation
- **Refined hover states** — black buttons turning red on hover

---

**Recovered** April 27, 2026 from `wpcp_posts.json` database export.
