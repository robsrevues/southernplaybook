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
| `src/components/Showcase.astro` | Sample sites by industry (grid of 12; rotates while on screen) |
| `src/components/samples/` | One file per sample site. Tree service mirrors rankintreeservice.com; the rest are made-up businesses. Copy one to add an industry, then list it in `Showcase.astro`. |
| `src/pages/index.astro` | Homepage copy and layout |
| `video/sample-sites/` | HyperFrames project: 4:5 social clips of the sample sites |
| `brand/` | Source PDF from Figma + mark SVGs (graphite and chalk) |

## Brand status

**Locked:** SP notebook mark (exact Figma vector), Public Sans ExtraBold wordmark, core neutrals graphite `#242424` / chalk `#F5F5F2` / silver `#BDBDB8`, one-ink logo.

**Accents:** clay `#B8553C` for filled CTA buttons on dark backgrounds only (buttons on light surfaces stay graphite); mustard `#D9A441` for small markers only (play-diagram targets, step numbers, quote marks, bullet chips, progress bars). Neither goes on the logo, headlines or large areas.

**Open:** secondary/body typeface (`--font-body` in `tokens.css`).

## Motion

Everything animates with CSS; JS only toggles classes. All motion respects `prefers-reduced-motion`, and content is fully visible with JS off.

## To do

- [ ] Final secondary font + accent
- [ ] `og:image` social card
- [ ] Replace FPO slots with real photos: pass `src` + `alt` to `<Fpo>` (labels describe each shot)

## Deploy

GitHub Pages, same setup as rankintreeservice.com. `.github/workflows/deploy.yml` builds and publishes on every push to `main`. `public/CNAME` sets the custom domain; `public/robots.txt` points Google at the sitemap (`/sitemap-index.xml`, generated at build).

DNS at Porkbun (website only — never touch the Google Workspace MX/TXT/CNAME records):

| Type | Host | Answer |
|---|---|---|
| A | (blank) | 185.199.108.153 |
| A | (blank) | 185.199.109.153 |
| A | (blank) | 185.199.110.153 |
| A | (blank) | 185.199.111.153 |
| CNAME | www | robsrevues.github.io |

