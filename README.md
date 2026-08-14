# ARGI Studio (`argi.©`)

Official website for **ARGI Studio**, an independent creative studio and art direction atelier based in Bali, Indonesia. We craft brand identities, digital flagships, tactile editorial publications, and progressive visual languages for visionary founders and cultural institutions worldwide.

---

## Overview

- **Studio**: ARGI Studio (`argi.©`)
- **Location**: Bali, Indonesia
- **Disciplines**: Brand Identity Design, Web Design & Development, Social Media & Content, Graphic Design & Print
- **Contact**: `hello@argistudio.com`
- **Tech Stack**: HTML5, Vanilla CSS3, Vanilla JavaScript (Zero external framework dependencies)

---

## Highlights

- **Interactive Hero**: Full 100vh layout with dynamic ASCII background canvas and mouse-lerped parallax editorial cards with sharp 0px geometry.
- **Methodology Viewer**: Step-by-step interactive process visualizer (*Inquire, Concept, Form, Prototype, Production, Release*).
- **Curated Selected Work**: Dual-mode portfolio with a 2-column sharp editorial gallery and a switchable index table view with a live cursor hover preview portal.
- **Commission Workbench & Brief Generator**: Interactive service scope selector that dynamically compiles a pre-formatted email template with one-click clipboard copying.
- **Adaptive SVG Monogram Favicon**: Dynamic `ag.©` SVG icon that automatically shifts between black and white based on system light/dark mode preferences.
- **Bali Real-Time Clock**: Live WITA (`Asia/Makassar` / UTC+8) studio timezone tracker in the footer.

---

## Directory Structure

```text
├── index.html            # Main site markup
├── styles.css            # Custom design system, typography, and responsive layouts
├── script.js             # Interactions, ASCII canvas, parallax, and modal brief logic
├── server.js             # Lightweight local static server
├── assets/
│   ├── logo.png          # High-resolution official serif wordmark
│   ├── favicon.svg       # Adaptive light/dark SVG monogram
│   ├── favicon-dark.svg  # Dark theme SVG icon
│   ├── favicon-light.svg # Light theme SVG icon
│   └── favicon.png       # PNG fallback icon
└── README.md
```

---

## Getting Started

No build step or package installations required. 

### Run locally:

```bash
# Using Node
node server.js

# Or using Python
python -m http.server 3000

# Or using npx
npx serve .
```

Open `http://localhost:3000` in your browser.

---

## Colophon

- **Typography**: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) & [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Photography**: Curated authentic design & branding photography via Unsplash
- **Design & Code**: ARGI Studio Atelier

© 2026 ARGI Studio. All rights reserved.
