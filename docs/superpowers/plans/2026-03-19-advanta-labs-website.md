# Advanta Labs Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page marketing website for Advanta Labs ("AI Enabler for Corporations") using Next.js 14 with CSS Modules, deployed to Vercel.

**Architecture:** Single-page Next.js App Router site. All content lives in `page.tsx` which composes section components (Navbar, Hero, Services, Process, Benefits, About, CtaBanner, Contact, Footer). Each component is a self-contained folder with `.tsx` + `.module.css`. Shared UI primitives (Button, Badge, Card) live in `components/ui/`. Framer Motion handles scroll-triggered animations and the process carousel. Fonts loaded via `next/font/google`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, CSS Modules, Framer Motion 11, next/font (Figtree, Inter, Fragment Mono, Satoshi)

**Spec:** `docs/superpowers/specs/2026-03-19-advanta-labs-website-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout, font loading, metadata, skip-nav link |
| `src/app/page.tsx` | Composes all section components in order |
| `src/app/globals.css` | CSS reset, design tokens, font-face declarations, global utilities |
| `src/components/ui/Button.tsx` + `.module.css` | Reusable button (primary/secondary/inverted variants) |
| `src/components/ui/Badge.tsx` + `.module.css` | Pill badge component for tags and labels |
| `src/components/ui/SectionHeader.tsx` + `.module.css` | Reusable label + heading + subtext pattern |
| `src/components/ui/ScrollReveal.tsx` | Framer Motion wrapper for scroll-triggered fade-in + slide-up |
| `src/components/Navbar/Navbar.tsx` + `.module.css` | Fixed navbar with scroll blur, mobile hamburger drawer |
| `src/components/Hero/Hero.tsx` + `.module.css` | Hero with badge, headline, subtitle, two CTAs, gradient bg |
| `src/components/Services/Services.tsx` + `.module.css` | Services grid with 4 cards + decorative UI mockups |
| `src/components/Services/ServiceCard.tsx` + `.module.css` | Individual service card with category tag, text, tags, mockup |
| `src/components/Services/mockups/*.tsx` | 4 small decorative UI mockup components (one per service) |
| `src/components/Process/Process.tsx` + `.module.css` | Process carousel with step navigation |
| `src/components/Process/ProcessStep.tsx` + `.module.css` | Individual step card with decorative UI |
| `src/components/Benefits/Benefits.tsx` + `.module.css` | Benefits 3x2 grid with 6 cards |
| `src/components/Benefits/BenefitCard.tsx` + `.module.css` | Individual benefit card with icon, title, description |
| `src/components/About/About.tsx` + `.module.css` | About section with heading, body text, optional graphic |
| `src/components/CtaBanner/CtaBanner.tsx` + `.module.css` | Full-width CTA banner with gradient background |
| `src/components/Contact/Contact.tsx` + `.module.css` | Contact form (placeholder) + email/LinkedIn sidebar |
| `src/components/Footer/Footer.tsx` + `.module.css` | 4-column footer with newsletter form + copyright |

---

## Task 1: Project Scaffolding & Global Setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx` (placeholder)

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/nicorosen/code_projects/react/advanta-labs-web
npx create-next-app@14 . --typescript --app --src-dir --no-tailwind --no-eslint --import-alias "@/*"
```

When prompted, answer: No to Tailwind, No to ESLint, Yes to `src/` directory, Yes to App Router, Yes to import alias `@/*`.

Note: If there are existing files (demo HTML, docs), the installer may warn. Proceed anyway - it won't overwrite the docs folder.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion@11
```

- [ ] **Step 3: Clean up default files**

Delete the default Next.js boilerplate content from:
- `src/app/page.tsx` - replace with a simple placeholder
- `src/app/globals.css` - will be replaced in next step
- `src/app/layout.tsx` - will be replaced in next step
- Delete `src/app/page.module.css` if it exists
- Delete `public/next.svg` and `public/vercel.svg` if they exist

- [ ] **Step 4: Write globals.css with design tokens and reset**

Create `src/app/globals.css`:

```css
:root {
  --color-primary: #23decb;
  --color-primary-dim: rgba(35, 222, 203, 0.1);
  --color-accent: #1a5ef0;
  --color-bg: #000000;
  --color-surface: #0d0d0d;
  --color-border: #222222;
  --color-text: #ffffff;
  --color-text-muted: #9ca3af;

  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;

  --transition-fast: 0.2s;
  --transition-normal: 0.3s;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-inter), sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

img {
  max-width: 100%;
  display: block;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-primary);
  color: var(--color-bg);
  font-weight: 600;
  border-radius: var(--radius-sm);
  z-index: 9999;
  transition: top var(--transition-fast);
}

.skip-to-content:focus {
  top: 1rem;
}

/* Focus ring for accessibility */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

- [ ] **Step 5: Write layout.tsx with fonts and metadata**

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Figtree, Inter, Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment-mono",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advanta Labs - AI Enabler for Corporations",
  description:
    "Advanta Labs brings intelligent automation to modern businesses. AI strategy, workflow automation, and custom AI solutions.",
  openGraph: {
    title: "Advanta Labs - AI Enabler for Corporations",
    description:
      "Advanta Labs brings intelligent automation to modern businesses. AI strategy, workflow automation, and custom AI solutions.",
    type: "website",
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${inter.variable} ${fragmentMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
```

Note: Satoshi is not available on Google Fonts. **Deliberate deferral:** Inter is used as the fallback for card labels/tags (spec originally called for Satoshi). Satoshi can be added later via `@font-face` from fontsource.org if needed. All card label/tag CSS uses `var(--font-inter)` which is the correct fallback.

- [ ] **Step 6: Write placeholder page.tsx**

Create `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main id="main-content">
      <h1>Advanta Labs</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify the dev server starts**

```bash
npm run dev &
```

Note: Run dev server in background (or a separate terminal). Kill it with `kill %1` or `pkill -f "next dev"` before the next task's verification step.

Open http://localhost:3000 in browser. Verify: black background, white "Advanta Labs" text, no errors in terminal.

- [ ] **Step 8: Add favicon**

Create `src/app/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#000000"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#23decb" font-family="sans-serif" font-weight="900" font-size="20">A</text>
</svg>
```

Then add `src/app/icon.svg` as a copy of `favicon.svg` (Next.js App Router serves `icon.svg` automatically). Also update `layout.tsx` metadata to add the icons field:

```tsx
icons: {
  icon: "/icon.svg",
},
```

Note: Open Graph image (1200x630) is deferred to a later task. The metadata includes OG title and description but no image placeholder for now.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with fonts, tokens, and global styles"
```

---

## Task 2: Shared UI Components (Button, Badge, SectionHeader, ScrollReveal)

**Files:**
- Create: `src/components/ui/Button.tsx` + `Button.module.css`
- Create: `src/components/ui/Badge.tsx` + `Badge.module.css`
- Create: `src/components/ui/SectionHeader.tsx` + `SectionHeader.module.css`
- Create: `src/components/ui/ScrollReveal.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.module.css`:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-sm);
  transition: opacity var(--transition-fast), border-color var(--transition-fast);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.primary {
  background: var(--color-primary);
  color: var(--color-bg);
}

.primary:hover {
  opacity: 0.9;
}

.secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.secondary:hover {
  border-color: var(--color-primary);
}

.inverted {
  background: var(--color-bg);
  color: var(--color-text);
}

.inverted:hover {
  opacity: 0.9;
}

.small {
  font-size: 0.875rem;
  padding: 0.5rem 1.25rem;
}
```

Create `src/components/ui/Button.tsx`:

```tsx
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "inverted";
  size?: "default" | "small";
  href?: string;
}

export function Button({
  variant = "primary",
  size = "default",
  href,
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    size === "small" && styles.small,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create Badge component**

Create `src/components/ui/Badge.module.css`:

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background: var(--color-primary-dim);
  color: var(--color-primary);
  letter-spacing: 0.025em;
}

.outline {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
}
```

Create `src/components/ui/Badge.tsx`:

```tsx
import styles from "./Badge.module.css";

interface BadgeProps {
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const classes = [styles.badge, variant === "outline" && styles.outline]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
```

- [ ] **Step 3: Create SectionHeader component**

Create `src/components/ui/SectionHeader.module.css`:

```css
.wrapper {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 3rem;
}

.label {
  font-family: var(--font-inter), sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.heading {
  font-family: var(--font-figtree), sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.subtext {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .heading {
    font-size: 1.75rem;
  }
}
```

Create `src/components/ui/SectionHeader.tsx`:

```tsx
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  label: string;
  heading: string;
  subtext?: string;
}

export function SectionHeader({ label, heading, subtext }: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.heading}>{heading}</h2>
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </div>
  );
}
```

- [ ] **Step 4: Create ScrollReveal animation wrapper**

Create `src/components/ui/ScrollReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Verify build succeeds**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add shared UI components (Button, Badge, SectionHeader, ScrollReveal)"
```

---

## Task 3: Navbar

**Files:**
- Create: `src/components/Navbar/Navbar.tsx` + `Navbar.module.css`
- Modify: `src/app/page.tsx` (add Navbar)

- [ ] **Step 1: Create Navbar.module.css**

Create `src/components/Navbar/Navbar.module.css`:

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  transition: background var(--transition-normal), backdrop-filter var(--transition-normal);
}

.scrolled {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.logo {
  font-family: var(--font-figtree), sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.025em;
}

.logoAccent {
  color: var(--color-primary);
}

.navLinks {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.navLink {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.navLink:hover {
  color: var(--color-text);
}

.ctaWrapper {
  display: flex;
  align-items: center;
}

/* Mobile menu toggle */
.menuToggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menuBar {
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

.menuToggle[aria-expanded="true"] .menuBar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menuToggle[aria-expanded="true"] .menuBar:nth-child(2) {
  opacity: 0;
}

.menuToggle[aria-expanded="true"] .menuBar:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile drawer */
.mobileDrawer {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(12px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 999;
}

.mobileDrawer.open {
  display: flex;
}

.mobileLink {
  font-family: var(--font-figtree), sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.mobileLink:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .navLinks {
    display: none;
  }

  .ctaWrapper {
    display: none;
  }

  .menuToggle {
    display: flex;
  }
}
```

- [ ] **Step 2: Create Navbar.tsx**

Create `src/components/Navbar/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Focus trap: listen for Tab key and cycle within drawer
      const drawer = document.querySelector('[role="dialog"]') as HTMLElement;
      if (!drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const trap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      };
      first?.focus();
      document.addEventListener("keydown", trap);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", trap);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#hero" className={styles.logo}>
          Advanta<span className={styles.logoAccent}>Labs</span>
        </a>

        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.ctaWrapper}>
          <Button variant="primary" size="small" href="#contact">
            Book a call
          </Button>
        </div>

        <button
          className={styles.menuToggle}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>
      </nav>

      <div
        className={`${styles.mobileDrawer} ${mobileOpen ? styles.open : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={closeMobile}
          >
            {item.label}
          </a>
        ))}
        <Button variant="primary" href="#contact" onClick={closeMobile}>
          Book a call
        </Button>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Add Navbar to page.tsx**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section id="hero" style={{ height: "100vh", paddingTop: "5rem" }}>
          <h1>Hero placeholder</h1>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

Start or restart the dev server (`npm run dev` in background). Check: navbar visible at top, links render, scrolling triggers backdrop blur, mobile hamburger appears at narrow viewport, mobile drawer opens/closes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar/ src/app/page.tsx
git commit -m "feat: add Navbar with scroll blur and mobile drawer"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/Hero/Hero.tsx` + `Hero.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero.module.css**

Create `src/components/Hero/Hero.module.css`:

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.5rem 4rem;
  overflow: hidden;
}

.gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(35, 222, 203, 0.06) 0%,
    transparent 60%
  );
  pointer-events: none;
  animation: gradientPulse 4s ease-in-out infinite;
}

@keyframes gradientPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.content {
  position: relative;
  z-index: 1;
  max-width: 56rem;
  text-align: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.headline {
  font-family: var(--font-figtree), sans-serif;
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text-muted);
  max-width: 36rem;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .headline {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
```

- [ ] **Step 2: Create Hero.tsx**

Create `src/components/Hero/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gradient} aria-hidden="true" />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.badge}>
          <Badge>New</Badge>
          <Badge variant="outline">AI Readiness Assessment</Badge>
        </div>
        <h1 className={styles.headline}>
          Intelligent Automation for Modern Businesses.
        </h1>
        <p className={styles.subtitle}>
          Advanta Labs brings AI automation to your fingertips &amp; streamline
          tasks.
        </p>
        <div className={styles.buttons}>
          <Button variant="primary" href="#contact">
            Get in touch
          </Button>
          <Button variant="secondary" href="#services">
            Learn more
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Update page.tsx to use Hero**

Update `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify in browser**

Check: hero fills viewport, badge pills render, headline displays in Figtree, two CTA buttons work, fade-in animation plays on load, gradient visible at top.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero/ src/app/page.tsx
git commit -m "feat: add Hero section with badge, headline, CTAs, and fade-in animation"
```

---

## Task 5: Services Section

**Files:**
- Create: `src/components/Services/Services.tsx` + `Services.module.css`
- Create: `src/components/Services/ServiceCard.tsx` + `ServiceCard.module.css`
- Create: `src/components/Services/mockups/TaskListMockup.tsx`
- Create: `src/components/Services/mockups/ChatMockup.tsx`
- Create: `src/components/Services/mockups/LeadListMockup.tsx`
- Create: `src/components/Services/mockups/ProjectDashMockup.tsx`
- Create: `src/components/Services/mockups/Mockup.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create shared mockup styles**

Create `src/components/Services/mockups/Mockup.module.css`:

```css
.mockup {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  font-family: var(--font-fragment-mono), monospace;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 1.5rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0;
  border-bottom: 1px solid var(--color-border);
}

.row:last-child {
  border-bottom: none;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dotGreen {
  background: #22c55e;
}

.dotYellow {
  background: #eab308;
}

.dotRed {
  background: #ef4444;
}

.dotCyan {
  background: var(--color-primary);
}

.bar {
  height: 6px;
  border-radius: 3px;
  background: var(--color-border);
}

.label {
  font-size: 0.625rem;
  color: var(--color-text-muted);
  opacity: 0.7;
}

.chatBubble {
  background: var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.6875rem;
}

.chatInput {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  margin-top: 0.75rem;
}

.tag {
  display: inline-block;
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
  background: var(--color-primary-dim);
  color: var(--color-primary);
  margin-right: 0.25rem;
}
```

- [ ] **Step 2: Create the four mockup components**

Create `src/components/Services/mockups/TaskListMockup.tsx`:

```tsx
import styles from "./Mockup.module.css";

export function TaskListMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span>Payroll management</span>
        <span className={styles.label}>Due 2nd July</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span>Employee Tracking</span>
        <span className={styles.label}>2 days ago</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span>Social media post</span>
        <span className={styles.label}>Cancelled</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotCyan}`} />
        <span>Lead list</span>
        <span className={styles.label}>70%</span>
      </div>
    </div>
  );
}
```

Create `src/components/Services/mockups/ChatMockup.tsx`:

```tsx
import styles from "./Mockup.module.css";

export function ChatMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.chatBubble}>What can I help with?</div>
      <div className={styles.chatBubble}>
        Help with customer handling or system changes
      </div>
      <div className={styles.chatInput}>
        <span style={{ opacity: 0.5 }}>Generate a...</span>
      </div>
      <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.5rem" }}>
        <span className={styles.tag}>Analyze</span>
        <span className={styles.tag}>Research</span>
        <span className={styles.tag}>E-mail</span>
      </div>
    </div>
  );
}
```

Create `src/components/Services/mockups/LeadListMockup.tsx`:

```tsx
import styles from "./Mockup.module.css";

export function LeadListMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span>Mike Taylor</span>
        <span className={styles.label}>Founder</span>
        <span className={styles.tag}>Verified</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span>Thomas Shelby</span>
        <span className={styles.label}>Founder</span>
        <span className={styles.tag}>Verified</span>
      </div>
      <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.75rem" }}>
        <span className={styles.tag}>Draft</span>
        <span className={styles.tag}>Schedule</span>
        <span className={styles.tag}>Sent</span>
      </div>
    </div>
  );
}
```

Create `src/components/Services/mockups/ProjectDashMockup.tsx`:

```tsx
import styles from "./Mockup.module.css";

export function ProjectDashMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.chatBubble}>Hey David! Here is your custom project</div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotCyan}`} />
        <span>Customer Support Chatbot</span>
        <span className={styles.label}>90%</span>
      </div>
      <div style={{ marginTop: "0.75rem" }}>
        <div className={styles.label}>Schedule</div>
        <div className={styles.row}>
          <span>Mo Tu We Th Fr Sa Su</span>
        </div>
        <div className={styles.label}>No meeting today.</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create ServiceCard component**

Create `src/components/Services/ServiceCard.module.css`:

```css
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 2rem;
  transition: border-color var(--transition-normal), transform var(--transition-normal);
}

.card:hover {
  border-color: rgba(35, 222, 203, 0.4);
  transform: scale(1.02);
}

.categoryTag {
  font-family: var(--font-inter), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.heading {
  font-family: var(--font-figtree), sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
```

Create `src/components/Services/ServiceCard.tsx`:

```tsx
import { Badge } from "@/components/ui/Badge";
import styles from "./ServiceCard.module.css";
import { ReactNode } from "react";

interface ServiceCardProps {
  category: string;
  heading: string;
  description: string;
  tags: string[];
  mockup: ReactNode;
}

export function ServiceCard({
  category,
  heading,
  description,
  tags,
  mockup,
}: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.categoryTag}>{category}</p>
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
      {mockup}
    </div>
  );
}
```

- [ ] **Step 4: Create Services section**

Create `src/components/Services/Services.module.css`:

```css
.section {
  padding: 6rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 4rem 1.5rem;
  }
}
```

Create `src/components/Services/Services.tsx`:

```tsx
"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceCard } from "./ServiceCard";
import { TaskListMockup } from "./mockups/TaskListMockup";
import { ChatMockup } from "./mockups/ChatMockup";
import { LeadListMockup } from "./mockups/LeadListMockup";
import { ProjectDashMockup } from "./mockups/ProjectDashMockup";
import styles from "./Services.module.css";

const SERVICES = [
  {
    category: "Workflow Automation",
    heading: "Automate repetitive tasks",
    description:
      "We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors.",
    tags: ["Internal Task Bots", "100+ Automations"],
    mockup: <TaskListMockup />,
  },
  {
    category: "AI Assistant",
    heading: "Delegate Daily Tasks",
    description:
      "From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster.",
    tags: ["Summaries", "Scheduling", "Many more"],
    mockup: <ChatMockup />,
  },
  {
    category: "Sales & Marketing",
    heading: "Accelerate Sales Growth",
    description:
      "AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence.",
    tags: ["Leads", "Content", "Social post"],
    mockup: <LeadListMockup />,
  },
  {
    category: "Custom Projects",
    heading: "Build Smarter Systems",
    description:
      "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.",
    tags: ["Strategy", "Custom AI", "Consulting"],
    mockup: <ProjectDashMockup />,
  },
];

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <ScrollReveal>
        <SectionHeader
          label="Our Services"
          heading="AI Solutions That Take Your Business to the Next Level"
          subtext="We design, develop, and implement automation tools that help you work smarter, not harder"
        />
      </ScrollReveal>
      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <ScrollReveal key={service.category} delay={i * 0.1}>
            <ServiceCard {...service} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Add Services to page.tsx**

Update `src/app/page.tsx` to add `<Services />` after `<Hero />`.

```tsx
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Verify in browser**

Check: services section appears below hero, 2x2 grid on desktop, stacks on mobile, cards have hover effects, scroll reveal animates cards in, mockups render inside cards.

- [ ] **Step 7: Commit**

```bash
git add src/components/Services/ src/app/page.tsx
git commit -m "feat: add Services section with 4 cards and decorative UI mockups"
```

---

## Task 6: Process Section (Carousel)

**Files:**
- Create: `src/components/Process/Process.tsx` + `Process.module.css`
- Create: `src/components/Process/ProcessStep.tsx` + `ProcessStep.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ProcessStep component**

Create `src/components/Process/ProcessStep.module.css`:

```css
.step {
  flex-shrink: 0;
  width: 100%;
  padding: 2rem;
}

.stepNumber {
  font-family: var(--font-fragment-mono), monospace;
  font-size: 0.75rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.title {
  font-family: var(--font-figtree), sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.description {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 32rem;
}

.decorative {
  margin-top: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  font-family: var(--font-fragment-mono), monospace;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.decorativeRow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}

.codeBlock {
  font-size: 0.6875rem;
  line-height: 1.5;
  color: var(--color-primary);
}
```

Create `src/components/Process/ProcessStep.tsx`:

```tsx
import styles from "./ProcessStep.module.css";

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  decorativeType: "analyze" | "develop" | "integrate" | "optimize";
}

function DecorativeUI({ type }: { type: ProcessStepProps["decorativeType"] }) {
  if (type === "analyze") {
    return (
      <div className={styles.decorative} aria-hidden="true">
        <div className={styles.decorativeRow}>
          <span className={styles.dot} />
          <span>Analyzing current workflow...</span>
        </div>
        <div className={styles.decorativeRow}>
          <span className={styles.dot} />
          <span>Process check</span>
        </div>
        <div className={styles.decorativeRow}>
          <span className={styles.dot} />
          <span>Manual work detected</span>
        </div>
        <div className={styles.decorativeRow}>
          <span className={styles.dot} />
          <span>Repetitive task found</span>
        </div>
      </div>
    );
  }

  if (type === "develop") {
    return (
      <div className={styles.decorative} aria-hidden="true">
        <pre className={styles.codeBlock}>
{`class AutomationTrigger:
    def check_trigger(self):
        return self.active
    def get_status(self):
        return "running"`}
        </pre>
      </div>
    );
  }

  if (type === "integrate") {
    return (
      <div className={styles.decorative} aria-hidden="true">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div
            style={{
              padding: "0.5rem 1rem",
              border: `1px solid var(--color-primary)`,
              borderRadius: "var(--radius-sm)",
              color: "var(--color-primary)",
            }}
          >
            Our solution
          </div>
          <span style={{ color: "var(--color-text-muted)" }}>&rarr;</span>
          <div
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            Your stack
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.decorative} aria-hidden="true">
      <div className={styles.decorativeRow}>
        <span className={styles.dot} />
        <span>Chatbot system</span>
        <span style={{ marginLeft: "auto", color: "var(--color-primary)" }}>
          +20% efficiency
        </span>
      </div>
      <div className={styles.decorativeRow}>
        <span className={styles.dot} />
        <span>Workflow system</span>
        <span style={{ marginLeft: "auto" }}>Update available</span>
      </div>
      <div className={styles.decorativeRow}>
        <span className={styles.dot} />
        <span>Sales system</span>
        <span style={{ marginLeft: "auto", color: "#22c55e" }}>Up to date</span>
      </div>
    </div>
  );
}

export function ProcessStep({
  stepNumber,
  title,
  description,
  decorativeType,
}: ProcessStepProps) {
  return (
    <div className={styles.step}>
      <p className={styles.stepNumber}>Step {stepNumber}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <DecorativeUI type={decorativeType} />
    </div>
  );
}
```

- [ ] **Step 2: Create Process carousel**

Create `src/components/Process/Process.module.css`:

```css
.section {
  padding: 6rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.carouselWrapper {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.carousel {
  display: flex;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top: 1px solid var(--color-border);
}

.navButton {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-muted);
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.navButton:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
}

.navButton:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.navButton:disabled:hover {
  border-color: var(--color-border);
  color: var(--color-text-muted);
}

.dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border);
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast);
  padding: 0;
}

.dotActive {
  background: var(--color-primary);
}

/* Mobile: stack vertically below 480px */
@media (max-width: 480px) {
  .carousel {
    flex-direction: column;
  }

  .controls {
    display: none;
  }

  .carouselWrapper {
    overflow: visible;
    border: none;
    background: transparent;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 4rem 1.5rem;
  }
}
```

Create `src/components/Process/Process.tsx`:

```tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProcessStep } from "./ProcessStep";
import styles from "./Process.module.css";

const STEPS = [
  {
    title: "Smart Analyzing",
    description:
      "We assess your needs and identify AI solutions to streamline workflows and improve efficiency.",
    decorativeType: "analyze" as const,
  },
  {
    title: "AI Development",
    description:
      "Our team builds intelligent automation systems tailored to your business processes.",
    decorativeType: "develop" as const,
  },
  {
    title: "Seamless Integration",
    description:
      "We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.",
    decorativeType: "integrate" as const,
  },
  {
    title: "Continuous Optimization",
    description:
      "We refine performance, analyze insights, and enhance automation for long-term growth.",
    decorativeType: "optimize" as const,
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function Process() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(STEPS.length - 1, current + 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section id="process" className={styles.section}>
      <ScrollReveal>
        <SectionHeader
          label="Our Process"
          heading="Our Simple, Smart, and Scalable Process"
          subtext="We design, develop, and implement automation tools that help you work smarter, not harder"
        />
      </ScrollReveal>
      <ScrollReveal>
        <div
          className={styles.carouselWrapper}
          role="region"
          aria-label="Process steps"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className={styles.carousel}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 && current < STEPS.length - 1)
                    next();
                  if (info.offset.x > 50 && current > 0) prev();
                }}
                style={{ width: "100%" }}
              >
                <div aria-live="polite">
                  <ProcessStep
                    stepNumber={current + 1}
                    {...STEPS[current]}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.controls}>
            <button
              className={styles.navButton}
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous step"
            >
              &larr; Previous
            </button>

            <div className={styles.dots}>
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.navButton}
              onClick={next}
              disabled={current === STEPS.length - 1}
              aria-label="Next step"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 3: Add Process to page.tsx**

Add `import { Process } from "@/components/Process/Process";` and `<Process />` after `<Services />`.

- [ ] **Step 4: Verify in browser**

Check: carousel shows one step at a time, prev/next buttons work, dots indicate current step, arrow keys navigate, swipe works on touch, stacks vertically on very small screens.

- [ ] **Step 5: Commit**

```bash
git add src/components/Process/ src/app/page.tsx
git commit -m "feat: add Process section with animated carousel and swipe support"
```

---

## Task 7: Benefits Section

**Files:**
- Create: `src/components/Benefits/Benefits.tsx` + `Benefits.module.css`
- Create: `src/components/Benefits/BenefitCard.tsx` + `BenefitCard.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create BenefitCard component**

Create `src/components/Benefits/BenefitCard.module.css`:

```css
.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 2rem;
  transition: border-color var(--transition-normal), transform var(--transition-normal);
}

.card:hover {
  border-color: rgba(35, 222, 203, 0.4);
  transform: scale(1.02);
}

.icon {
  width: 2.5rem;
  height: 2.5rem;
  background: var(--color-primary-dim);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--color-primary);
  font-size: 1.25rem;
}

.title {
  font-family: var(--font-figtree), sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.description {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}
```

Create `src/components/Benefits/BenefitCard.tsx`:

```tsx
import styles from "./BenefitCard.module.css";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
```

- [ ] **Step 2: Create Benefits section**

Create `src/components/Benefits/Benefits.module.css`:

```css
.section {
  padding: 6rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 4rem 1.5rem;
  }
}
```

Create `src/components/Benefits/Benefits.tsx`:

```tsx
"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BenefitCard } from "./BenefitCard";
import styles from "./Benefits.module.css";

const BENEFITS = [
  {
    icon: "\u26A1",
    title: "Increased Productivity",
    description:
      "Gain actionable insights with AI-driven analytics to improve decision-making and strategy.",
  },
  {
    icon: "\u2764",
    title: "Better Customer Experience",
    description:
      "Personalized AI interactions improve response times, customer engagement, and overall satisfaction.",
  },
  {
    icon: "\u23F0",
    title: "24/7 Availability",
    description:
      "AI-powered systems operate around the clock, ensuring seamless support and execution without downtime.",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Cost Reduction",
    description:
      "AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation for better profitability.",
  },
  {
    icon: "\uD83D\uDCC8",
    title: "Data-Driven Insights",
    description:
      "Leverage AI to analyze vast data sets, identify trends, and make smarter, faster, and more accurate business decisions.",
  },
  {
    icon: "\uD83D\uDE80",
    title: "Scalability & Growth",
    description:
      "AI adapts to your business needs, allowing you to scale efficiently without increasing workload or costs.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className={styles.section}>
      <ScrollReveal>
        <SectionHeader
          label="Benefits"
          heading="The Key Benefits of AI for Your Business Growth"
          subtext="Discover how AI automation enhances efficiency, reduces costs, and drives business growth with smarter, faster processes."
        />
      </ScrollReveal>
      <div className={styles.grid}>
        {BENEFITS.map((benefit, i) => (
          <ScrollReveal key={benefit.title} delay={i * 0.1}>
            <BenefitCard {...benefit} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add Benefits to page.tsx**

Add `import { Benefits } from "@/components/Benefits/Benefits";` and `<Benefits />` after `<Process />`.

- [ ] **Step 4: Verify in browser**

Check: 3x2 grid on desktop, 2-column on tablet, single-column on mobile, cards hover with cyan border, scroll reveal works.

- [ ] **Step 5: Commit**

```bash
git add src/components/Benefits/ src/app/page.tsx
git commit -m "feat: add Benefits section with 6 cards in responsive grid"
```

---

## Task 8: About Section

**Files:**
- Create: `src/components/About/About.tsx` + `About.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/About/About.module.css`:

```css
.section {
  padding: 6rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.content {
  display: flex;
  gap: 4rem;
  align-items: center;
}

.text {
  flex: 1;
}

.heading {
  font-family: var(--font-figtree), sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.body {
  font-size: 1.0625rem;
  color: var(--color-text-muted);
  line-height: 1.8;
}

.graphic {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pattern {
  width: 100%;
  max-width: 20rem;
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary-dim), var(--color-surface));
  border: 1px solid var(--color-border);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
  padding: 2rem;
}

.patternCell {
  border-radius: var(--radius-sm);
  background: var(--color-border);
  opacity: 0.5;
  transition: opacity var(--transition-normal);
}

.patternCell:nth-child(odd) {
  background: var(--color-primary);
  opacity: 0.15;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 2rem;
  }

  .heading {
    font-size: 1.75rem;
  }

  .section {
    padding: 4rem 1.5rem;
  }
}
```

Create `src/components/About/About.tsx`:

```tsx
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section}>
      <ScrollReveal>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={styles.heading}>About Advanta Labs</h2>
            <p className={styles.body}>
              Advanta Labs is a team of AI specialists dedicated to helping
              corporations harness the power of intelligent automation. We
              combine deep technical expertise with strategic consulting to
              deliver solutions that drive real business outcomes. From workflow
              automation to custom AI systems, we partner with enterprises to
              build smarter, faster, and more resilient operations.
            </p>
          </div>
          <div className={styles.graphic} aria-hidden="true">
            <div className={styles.pattern}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={styles.patternCell} />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Add About to page.tsx**

Add `import { About } from "@/components/About/About";` and `<About />` after `<Benefits />`.

- [ ] **Step 3: Verify in browser**

Check: heading and body text render, geometric pattern graphic displays, responsive stacking on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/About/ src/app/page.tsx
git commit -m "feat: add About section with company overview and abstract graphic"
```

---

## Task 9: CTA Banner Section

**Files:**
- Create: `src/components/CtaBanner/CtaBanner.tsx` + `CtaBanner.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create CtaBanner component**

Create `src/components/CtaBanner/CtaBanner.module.css`:

```css
.section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(35, 222, 203, 0.15), rgba(26, 94, 240, 0.1));
  border-top: 1px solid rgba(35, 222, 203, 0.2);
  border-bottom: 1px solid rgba(35, 222, 203, 0.2);
}

.content {
  max-width: 48rem;
  margin: 0 auto;
  text-align: center;
}

.heading {
  font-family: var(--font-figtree), sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.subtext {
  font-size: 1.0625rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .heading {
    font-size: 1.75rem;
  }

  .section {
    padding: 4rem 1.5rem;
  }
}
```

Create `src/components/CtaBanner/CtaBanner.tsx`:

```tsx
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import styles from "./CtaBanner.module.css";

export function CtaBanner() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Ready to Transform Your Business?
          </h2>
          <p className={styles.subtext}>
            Let&apos;s discuss how AI automation can streamline your operations
            and accelerate growth.
          </p>
          <Button variant="inverted" href="#contact">
            Book a call
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Add CtaBanner to page.tsx**

Add `import { CtaBanner } from "@/components/CtaBanner/CtaBanner";` and `<CtaBanner />` after `<About />`.

- [ ] **Step 3: Verify in browser**

Check: gradient banner visible, heading + subtext centered, inverted button renders.

- [ ] **Step 4: Commit**

```bash
git add src/components/CtaBanner/ src/app/page.tsx
git commit -m "feat: add CTA banner section with gradient background"
```

---

## Task 10: Contact Section

**Files:**
- Create: `src/components/Contact/Contact.tsx` + `Contact.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Contact component**

Create `src/components/Contact/Contact.module.css`:

```css
.section {
  padding: 6rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.content {
  display: flex;
  gap: 4rem;
}

.formSide {
  flex: 1.5;
}

.heading {
  font-family: var(--font-figtree), sans-serif;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input,
.textarea {
  font-family: var(--font-inter), sans-serif;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  transition: border-color var(--transition-fast);
  width: 100%;
}

.input::placeholder,
.textarea::placeholder {
  color: var(--color-text-muted);
}

.input:focus,
.textarea:focus {
  border-color: var(--color-primary);
  outline: none;
}

.textarea {
  min-height: 8rem;
  resize: vertical;
}

.infoSide {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 4rem;
}

.infoBlock {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.infoLabel {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.infoValue {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.infoValue a {
  color: var(--color-text);
  transition: color var(--transition-fast);
}

.infoValue a:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    gap: 2rem;
  }

  .heading {
    font-size: 1.75rem;
  }

  .infoSide {
    padding-top: 0;
  }

  .section {
    padding: 4rem 1.5rem;
  }
}
```

Create `src/components/Contact/Contact.tsx`:

```tsx
"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <ScrollReveal>
        <div className={styles.content}>
          <div className={styles.formSide}>
            <h2 className={styles.heading}>Get in Touch</h2>
            <form
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Your name"
                className={styles.input}
                aria-label="Your name"
              />
              <input
                type="email"
                placeholder="Your email"
                className={styles.input}
                aria-label="Your email"
              />
              <textarea
                placeholder="Your message"
                className={styles.textarea}
                aria-label="Your message"
              />
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </form>
          </div>

          <div className={styles.infoSide}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>
                <a href="mailto:hello@advantalabs.co">hello@advantalabs.co</a>
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>LinkedIn</span>
              <span className={styles.infoValue}>
                <a
                  href="https://linkedin.com/company/advantalabs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Advanta Labs
                </a>
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Add Contact to page.tsx**

Add `import { Contact } from "@/components/Contact/Contact";` and `<Contact />` after `<CtaBanner />`.

- [ ] **Step 3: Verify in browser**

Check: form renders with 3 fields + button, email and LinkedIn info displays on right, responsive stacking on mobile, form prevents default on submit.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact/ src/app/page.tsx
git commit -m "feat: add Contact section with placeholder form and contact info"
```

---

## Task 11: Footer

**Files:**
- Create: `src/components/Footer/Footer.tsx` + `Footer.module.css`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer/Footer.module.css`:

```css
.footer {
  border-top: 1px solid var(--color-border);
  padding: 4rem 2rem 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

.columns {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.brandCol {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.logo {
  font-family: var(--font-figtree), sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.025em;
}

.logoAccent {
  color: var(--color-primary);
}

.tagline {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.newsletterLabel {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
  margin-top: 0.5rem;
}

.newsletterForm {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.newsletterInput {
  font-family: var(--font-inter), sans-serif;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text);
  flex: 1;
}

.newsletterInput::placeholder {
  color: var(--color-text-muted);
}

.linkCol {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.colHeading {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.footerLink {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.footerLink:hover {
  color: var(--color-primary);
}

.copyright {
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .columns {
    grid-template-columns: 1fr 1fr;
  }

  .brandCol {
    grid-column: 1 / -1;
  }

  .footer {
    padding: 3rem 1.5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
```

Create `src/components/Footer/Footer.tsx`:

```tsx
import { Button } from "@/components/ui/Button";
import styles from "./Footer.module.css";

const LINK_SECTIONS = [
  {
    heading: "Links",
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Benefits", href: "#benefits" },
    ],
  },
  {
    heading: "Pages",
    links: [
      { label: "Home", href: "#hero" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Socials",
    links: [
      {
        label: "LinkedIn",
        href: "https://linkedin.com/company/advantalabs",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            Advanta<span className={styles.logoAccent}>Labs</span>
          </div>
          <p className={styles.tagline}>
            Automate Smarter, Optimize Faster, and Grow Stronger.
          </p>
          <p className={styles.newsletterLabel}>Join our newsletter</p>
          <form
            className={styles.newsletterForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="name@email.com"
              className={styles.newsletterInput}
              aria-label="Email for newsletter"
            />
            <Button variant="primary" size="small" type="submit">
              Subscribe
            </Button>
          </form>
        </div>

        {LINK_SECTIONS.map((section) => (
          <div key={section.heading} className={styles.linkCol}>
            <p className={styles.colHeading}>{section.heading}</p>
            {section.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.footerLink}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.copyright}>
        &copy; Advanta Labs - All rights reserved
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to page.tsx and finalize all sections**

Final `src/app/page.tsx`:

```tsx
import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { Services } from "@/components/Services/Services";
import { Process } from "@/components/Process/Process";
import { Benefits } from "@/components/Benefits/Benefits";
import { About } from "@/components/About/About";
import { CtaBanner } from "@/components/CtaBanner/CtaBanner";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Process />
        <Benefits />
        <About />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

Check: footer renders with 4 columns, newsletter form present, all links point to correct anchors, LinkedIn opens in new tab, copyright displays, responsive stacking works.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer/ src/app/page.tsx
git commit -m "feat: add Footer with newsletter form, link columns, and copyright"
```

---

## Task 12: Full Build Verification & Cleanup

**Files:**
- Modify: various (cleanup only)
- Delete: `demo-tailwind.html`, `demo-cssmodules.html`

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes successfully with no errors.

- [ ] **Step 2: Start production server and verify**

```bash
npm run start
```

Open http://localhost:3000. Scroll through the entire page. Verify:
- All 9 sections render in correct order
- Navbar blur works on scroll
- Hero fade-in animation plays
- All scroll reveal animations trigger
- Services grid is 2x2 on desktop
- Process carousel navigates correctly
- Benefits grid is 3x2 on desktop
- About section layout is correct
- CTA banner gradient visible
- Contact form renders with info sidebar
- Footer columns display correctly
- All anchor links scroll to correct sections
- Mobile layout works (resize browser or use dev tools)

- [ ] **Step 3: Delete demo HTML files**

```bash
rm demo-tailwind.html demo-cssmodules.html
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: remove demo files and verify production build"
```

---

## Summary

| Task | Component | Files |
|------|-----------|-------|
| 1 | Project scaffolding | layout, globals, page, config |
| 2 | Shared UI | Button, Badge, SectionHeader, ScrollReveal |
| 3 | Navbar | Navbar with scroll blur + mobile drawer |
| 4 | Hero | Hero with badge, headline, CTAs, animation |
| 5 | Services | 4 service cards with decorative mockups |
| 6 | Process | Carousel with steps, swipe, keyboard nav |
| 7 | Benefits | 6 benefit cards in responsive grid |
| 8 | About | Company overview + abstract graphic |
| 9 | CTA Banner | Gradient banner with call-to-action |
| 10 | Contact | Placeholder form + contact info |
| 11 | Footer | Newsletter form + link columns + copyright |
| 12 | Verification | Build check, cleanup, final commit |
