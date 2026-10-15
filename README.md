# Mushfiqur Rashid — Portfolio

Personal portfolio of **Md. Mushfiqur Rashid Marmo**, Product Manager (Tech), full-stack developer and AI/ML builder.

Built with **Next.js 16** (App Router, static prerendering), **Tailwind CSS 4**, **Motion** and **Lenis** smooth scrolling.

## Run locally

```bash
npm install
npm run preview    # production build + server at http://localhost:3000 — real speed
npm run dev        # development mode with live reload, for editing
npm run lint
```

> `npm run dev` is much slower than the live site: it compiles on demand and ships unminified,
> debug-mode JavaScript (≈1 MB vs ≈230 KB). To judge speed, use `npm run preview`, which matches
> what Vercel serves.

## Editing content

All text lives in [`lib/data.ts`](lib/data.ts): experience, products, projects, skills, stats, links. Edit that file and the whole site updates.

| What | Where |
| --- | --- |
| Profile photo (transparent PNG) | `public/images/portrait.png` |
| Product screenshots (1440×900) | `public/images/work/*.jpg` |
| Downloadable CV | `public/cv/Md_Mushfiqur_Rashid_Marmo_CV.pdf` |
| Colours, fonts, animations | `app/globals.css` (`@theme` block) |
| Social preview image | `app/opengraph-image.tsx` (generated at build) |
| Favicon | `app/icon.svg`, `app/apple-icon.png` |

## Deploy to Vercel

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/MushfiqurRashid/portfolio.git
   git push -u origin main
   ```
2. On [vercel.com/new](https://vercel.com/new), import the repository. The defaults are correct (Framework: Next.js, no environment variables required) — click **Deploy**.
3. Optional: add a custom domain under **Project → Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in **Settings → Environment Variables** and redeploy so canonical URLs, the sitemap and social previews use your domain. Without it, the Vercel production URL is used automatically.
4. Optional: to verify the site in [Google Search Console](https://search.google.com/search-console) with the "HTML tag" method, set `GOOGLE_SITE_VERIFICATION` to the token Google gives you (just the `content` value) and redeploy. Then submit `/sitemap.xml` there.

## Structure

```
app/            layout, page, metadata, OG image, sitemap, robots, 404
components/
  sections/     hero, marquee, about, work, experience, projects, recognition, toolkit, contact
  ui/           reusable pieces: magnetic, reveal text, counters, spotlight cards, buttons
  navbar, footer, preloader, cursor, scroll progress, providers (smooth scroll + motion config)
lib/            data.ts (content), hooks.ts, utils.ts
```

## Performance rules of thumb

The site is tuned to stay smooth on older laptops with integrated graphics. When adding effects:

- **Entrance animations:** animate `opacity` and a full `transform` string (`transform: "translateY(24px)"`), not `x`/`y`/`scale`. Motion then runs them on the browser's compositor instead of repainting every frame.
- **Scroll- or mouse-driven motion** (`useScroll`/`useTransform`/springs bound to `style`): give the element `will-change-transform`, otherwise it is repainted on every frame.
- **No `backdrop-filter`** (glass blur): it is recomputed every frame while anything behind it moves. Use a translucent background (`glass` utility) instead.
- Pause continuous JavaScript animations when off-screen (see the marquee's `useInView`).

The intro screen counts on first paint using CSS, plays once per browser session, and a CSS safety net shows the page after 4.5 s if JavaScript fails to load.

Accessibility: respects `prefers-reduced-motion` (no preloader, smooth scroll or transform animations), keyboard focus styles, semantic landmarks, and the custom cursor only appears on mouse/trackpad devices.
