# Sample-site videos (HyperFrames)

Short 4:5 clips (1080×1350, 11 s) of the three made-up sample client sites, built with [HyperFrames](https://github.com/heygen-com/hyperframes). Each one shows a visitor tapping the main button, the lead landing on the owner's phone, then the Southern Playbook end card. Made for Instagram / Facebook feeds and LinkedIn.

| Variable `site` | Business | Payoff shown |
|---|---|---|
| `tree` | Cypress Tree Care | Quote request with a photo |
| `chiro` | Northside Chiropractic | Patient books their own slot |
| `bbq` | Hickory & Ash | Pickup order placed and paid |

## Render

```bash
cd video/sample-sites
npx hyperframes@0.9.7 render --variables '{"site":"tree"}'  -o renders/sample-tree-4x5.mp4
npx hyperframes@0.9.7 render --variables '{"site":"chiro"}' -o renders/sample-chiro-4x5.mp4
npx hyperframes@0.9.7 render --variables '{"site":"bbq"}'   -o renders/sample-bbq-4x5.mp4
```

Needs Node 22+ and FFmpeg (`brew install ffmpeg`). On first render HyperFrames downloads its own headless Chrome. If it can't, point it at an installed one, e.g. `export HYPERFRAMES_BROWSER_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.

Preview and scrub in the browser: `npm run dev`. Check before rendering: `npm run check`.

## Notes

- GSAP and Public Sans are vendored in `assets/` so renders never depend on a CDN.
- Frame 0 is the social thumbnail, so each clip opens on its headline already on screen.
- The end card uses the locked SP mark and wordmark ratios from the brand file.
- `renders/` is git-ignored. Re-render rather than committing MP4s.
- To add a sample business, add an entry to `SITES` in `index.html` (its markup, notification and caption) and render with its key.
- For Claude Code on your Mac, the HyperFrames plugin adds authoring skills: `claude plugin marketplace add heygen-com/hyperframes` then `claude plugin install hyperframes@hyperframes`.
