# southernplaybook.com

Marketing site for Southern Playbook — *Game plans for local business.*

Built with [Astro](https://astro.build): static HTML, zero framework JS, one ~1.5 KB script for scroll reveals and the sample-site showcase. Fonts are self-hosted (Public Sans via Fontsource), so there are no third-party requests.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
```

## Where things live

| Path | What it is |
|---|---|
| `src/styles/tokens.css` | Colors, type, spacing, motion. **Start here for brand changes.** |
| `src/components/Lockup.astro` | Mark + wordmark lockup (locked geometry) |
| `src/components/PlayDiagram.astro` | Animated chalk play in the hero |
| `src/components/Showcase.astro` | Rotating sample client sites (fictional businesses) |
| `src/pages/index.astro` | Homepage copy and layout |
| `brand/` | Source PDF from Figma + mark SVGs (graphite and chalk) |

## Brand status

**Locked:** SP notebook mark (exact Figma vector), Public Sans ExtraBold wordmark, core neutrals graphite `#242424` / chalk `#F5F5F2` / silver `#BDBDB8`, one-ink logo.

**Open:** secondary/body typeface and accent color. Both are single tokens in `tokens.css`. The current accent (red clay `#D0684E`) is a placeholder and only appears on the hero play routes, the proof dots and the focus ring.

## Motion

Everything animates with CSS; JS only toggles classes. All motion respects `prefers-reduced-motion`, and content is fully visible with JS off.

## To do

- [ ] Real inbox (currently `hello@southernplaybook.com` in `index.astro`)
- [ ] Final secondary font + accent
- [ ] `og:image` social card
- [ ] Hosting (Netlify, Vercel or Cloudflare Pages all work — point the build at `dist/`)
