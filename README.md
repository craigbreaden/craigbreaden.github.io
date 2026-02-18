```
$ whoami
```

# Engineered by Breaden

> Personal site of Craig Breaden -- Senior Solutions Architect, accidental philosopher, and professional rabbit-hole explorer.

**Live at** [engineeredbybreaden.com](https://engineeredbybreaden.com)

---

## What is this?

A one-page interactive portfolio with a terminal/CS aesthetic. No frameworks. No build step. Just HTML, CSS, and JavaScript pretending to be more complicated than they are.

```
$ tree
.
├── index.html        # The whole site
├── css/styles.css    # Dark theme, terminal vibes
├── js/main.js        # Particles, typing, interactions
├── images/           # Just me and my dog
├── favicon.svg       # >_
├── CNAME             # engineeredbybreaden.com
└── .nojekyll         # We don't need Jekyll where we're going
```

## Features

- **Particle network background** -- interactive, follows your cursor, connects nearby nodes. Because every CS portfolio needs floating dots.
- **Terminal typing hero** -- `whoami`, but make it a website.
- **Skills explorer** -- Six categories of things I actually work with in critical infrastructure environments. Click around, hover for context.
- **Curiosity constellation** -- Hobby interests orbiting a center of gravity called "curiosity." Quantum computing and philosophy live here. They get along surprisingly well.
- **Life.log** -- Running, cycling, reading, and dog metrics. All enthusiasm bars are suspiciously high.
- **Musings placeholder** -- `ls ./posts/` returns empty. For now.

## Tech Stack

| What | Why |
|------|-----|
| Vanilla HTML | It works. It's fast. It doesn't need `node_modules`. |
| Vanilla CSS | Custom properties, grid, animations. No Tailwind was harmed. |
| Vanilla JS | Canvas particles, IntersectionObserver, zero dependencies. |
| GitHub Pages | Free hosting for a site that costs $0 to build. |
| Google Fonts | JetBrains Mono + Inter. Monospace for the vibe, sans-serif for the readability. |

## Local Development

```bash
# It's a static site. Pick your poison:
open index.html
# or
python3 -m http.server 8000
# or
npx serve .
```

## Deployment

Push to `master`. GitHub Actions copies everything to `gh-pages`. That's it. The whole CI/CD pipeline is 24 lines of YAML.

## What's Next

- [ ] Actually write blog posts for the musings section
- [ ] Strava / Goodreads integrations
- [ ] Dark mode toggle (it's already dark... darker mode?)
- [ ] More interactive visualizations for the interests section

---

```
$ exit
```
