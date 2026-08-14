# David AI - Visual & Layout Clone

A high-fidelity, responsive frontend visual and layout clone of [withdavid.ai](https://www.withdavid.ai/), built with modern semantic HTML5, Vanilla CSS3 (Custom Properties & Responsive Layouts), and interactive JavaScript.

## 🚀 Features & Highlights

- **Floating Adaptive Pill Navigation**:
  - Automatically transitions between light and dark theme styles when crossing over the dark `#datasets` section.
  - Active section indicator synchronization during scrolling.
  - Mobile hamburger navigation drawer with smooth transitions.
- **Hero Showcase**:
  - Serif headline typography (*Besley*) paired with clean modern sans-serif (*Inter*).
  - Ambient gradient glow and wave mask background.
- **Section 1: Mission**:
  - Numbered pill badge `[ 1 | Mission ]` and dual-tone editorial typography.
- **Section 2: Process (Interactive Timeline)**:
  - 6 distinct workflow stages (*Hypothesize, Design, Experiment, Evaluate & Iterate, Productionize, Release*).
  - Interactive click-to-view step switcher with synchronized artwork previews.
- **Section 3: Featured Datasets (Dark Mode Experience)**:
  - Deep dark background theme with high-contrast card styling.
  - 4 showcase dataset cards: **Converse**, **Atlas**, **Chorus**, and **Dialog** with video playback & dialect map graphics.
  - 4-step procurement guide grid (*Request samples, Purchase access, Receive data, Experiment with us*).
- **Section 4: Careers**:
  - Clean split layout featuring custom isometric artwork and CTA button.
- **Section 5: News & Funding**:
  - Latest press release cards (Series B $50M, Series A $25M, Seed Round $5M) with date tags and zoom micro-interactions.
- **Footer**:
  - "Interested in working with us?" call-to-action banner, legal links, copyright, and social links (LinkedIn, X).

---

## 📁 Project Structure

```text
├── index.html       # Semantic HTML5 page structure
├── styles.css       # Design tokens, typography, layouts, and responsive breakpoints
├── script.js        # Dynamic theme switcher, interactive tabs, and mobile menu
├── .gitignore       # Git ignore rules for clean repository state
└── README.md        # Documentation and setup instructions
```

---

## 🛠️ How to Run Locally

You can open `index.html` directly in any modern web browser or run a lightweight local static server:

### Option 1: Double-click or open directly
Double-click `index.html` in your file explorer.

### Option 2: Using Python (built-in)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option 3: Using Node / npx serve
```bash
npx serve .
```

---

## 🌐 Pushing to GitHub

To push this repository to your GitHub account:

1. **Create a new repository** on [github.com](https://github.com/new) (e.g. `david-ai-clone`).
2. **Link the remote repository and push**:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```
