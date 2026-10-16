# ⚡ Modern Turnkey Portfolio Template (Next.js & Tailwind CSS)

> **A high-converting, 100% front-end portfolio template built with Next.js 16 (App Router), React 19, and Tailwind CSS v4 — entirely driven by a single `data.json` file.**

Designed specifically as a **ready-to-sell digital product** for freelancers, developers, designers, architects, photographers, and professionals who want a modern, clean online portfolio without writing or touching any code.

---

## 🌟 Key Features

- **🚀 100% Front-End & Static Fast**: No databases or server maintenance required. Generates ultra-fast static HTML/CSS.
- **📄 Single File Data Management (`data.json`)**: Every single piece of content (profile, photo, titles, bio, skills, timeline, projects, reviews, contact details, social links, SEO tags) is configured in `src/data/data.json`.
- **🌓 Seamless Dark / Light Mode**: Smooth theme toggle with system preference detection and localStorage persistence.
- **📥 1-Click CV / Resume Download & Print Modal**: One-click download of `resume.pdf` plus a live interactive printable resume modal formatted to A4 paper.
- **📬 Zero-Backend Contact Form (Web3Forms / Formspree)**: Directly forwards client inquiries to the user's personal email for free using Web3Forms.
- **🎨 Interactive Projects Showcase**: Filter by category, live instant search input, and deep-dive Case Study detail modals.
- **🛠️ Built-in Live Customizer Drawer**: Real-time in-browser data editor allowing prospective clients or buyers to test modifications live and export their custom `data.json` with a single click.

---

## 📁 Project Architecture

```
developer-portfolio-template/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with dynamic SEO metadata from data.json
│   │   ├── page.tsx           # Assembled portfolio sections
│   │   └── globals.css        # Tailwind v4 theme and custom dark variant
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky glassmorphism header & theme switch
│   │   ├── Hero.tsx           # Rotating titles, avatar, CTAs, & stats bar
│   │   ├── About.tsx          # Story, quick facts, & value highlights
│   │   ├── Skills.tsx         # Categorized skills with animated progress bars
│   │   ├── Experience.tsx     # Work & education dual timeline
│   │   ├── Projects.tsx       # Filterable showcase with search
│   │   ├── ProjectModal.tsx   # Project case study detail dialog
│   │   ├── Testimonials.tsx   # Client endorsements & 5-star ratings
│   │   ├── Contact.tsx        # Web3Forms-integrated contact form & email copy
│   │   ├── ResumeModal.tsx    # Live formatted printable CV & PDF download
│   │   ├── LiveEditorDrawer.tsx # In-browser live editor & JSON exporter
│   │   ├── Icons.tsx          # Dynamic SVG & Lucide icon provider
│   │   └── Providers.tsx      # Theme and Portfolio context providers
│   ├── context/
│   │   ├── ThemeContext.tsx   # Dark/light theme state
│   │   └── PortfolioContext.tsx # Central data and live-preview state
│   ├── data/
│   │   └── data.json          # 🌟 Single source of truth for all content
│   └── types/
│       └── portfolio.ts       # Full TypeScript schema for portfolio data
├── public/
│   ├── data.json              # Public copy for static queries
│   └── resume.pdf             # Fallback starter resume document
├── CUSTOMIZATION_GUIDE.md     # Detailed client onboarding guide (Arabic & English)
└── package.json
```

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
```

---

## 📖 Client Customization

See the comprehensive [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for detailed Arabic & English instructions on customizing `data.json`, setting up the free Web3Forms email key, and 1-click deployment to Vercel/Netlify.
