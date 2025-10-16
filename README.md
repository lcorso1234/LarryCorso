# LarryCorso — Next.js media site

This repository contains a Next.js app (App Router) built with TypeScript and Tailwind CSS.

Quick start

1. Install deps:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Build for production locally:

```bash
npm run build
npm start
```

Cleaning before push

Make sure the following files are not committed: `node_modules/`, `.next/`, and any local env files. A `.gitignore` is included.

Upload to GitHub

If this repo isn't yet on GitHub, run:

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create <your-username>/<repo-name> --public --source=. --remote=origin
git push -u origin main
```

If already a repo, simply:

```bash
git add .
git commit -m "Clean repo and add README"
git push
```

Deploy

For quick hosting use Vercel. Connect your GitHub repo and Vercel will build automatically. Ensure you do not run lint in build pipeline or fix lint errors before deploying if your CI enforces lint.

Notes

- This README provides minimal steps. If you want, I can add a CONTRIBUTING.md, license, or CI config next.

# DGC Digital Cosmos Website

A Next.js cyberpunk-themed portfolio and contact site for Digital Genesis Collective.

## 🚀 Features

- **Cyberpunk Design** - Batman-inspired dark aesthetic with neon accents
- **Contact Form** - EmailJS integration for direct email delivery
- **Portfolio Showcase** - Project displays with interactive elements
- **Manifesto** - Mission statement and philosophy
- **Responsive** - Works on all devices

## 📧 Contact Form

The contact form sends emails directly to `lawrence@rumidesign.tech` using EmailJS.

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **EmailJS** - Email service

## 🚀 Deployment

This site is configured for static export and can be deployed on any hosting platform:

### Vercel (Recommended)

```bash
npm run build
```

### Netlify

```bash
npm run build
```

### GitHub Pages

```bash
npm run build
```

### Any Static Host

The `out/` folder contains the complete static site.

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Home page
│   ├── connect/          # Contact form
│   ├── manifesto/        # Mission statement
│   ├── portfolio/        # Project showcase
│   └── layout.tsx        # Root layout
├── public/               # Static assets
└── EMAIL_SETUP.md        # EmailJS setup guide
```

## 🔧 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting

## 📬 Contact

**Email**: lawrence@rumidesign.tech  
**Website**: [Digital Genesis Collective]

---

_Built with 🖤 by Digital Genesis Collective_
