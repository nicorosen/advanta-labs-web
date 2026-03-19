# Advanta Labs Website - Design Spec

## Overview

Replicate the www.advantalabs.co marketing site as a Next.js application. The new site is "inspired by" the original - same messaging and content, same general structure, but with freedom to diverge on design details. Single-page architecture deployed to Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** CSS Modules
- **Fonts:** Figtree (primary), Inter, Fragment Mono, Satoshi (via next/font / Google Fonts)
- **Animations:** Framer Motion (scroll-triggered reveals, hover effects, transitions)
- **Deployment:** Vercel (build first, deploy later)

## Design Tokens (globals.css)

```css
:root {
  --color-primary: #23decb;
  --color-primary-dim: rgba(35, 222, 203, 0.1);
  --color-bg: #000000;
  --color-surface: #0d0d0d;
  --color-border: #222222;
  --color-text: #ffffff;
  --color-text-muted: #9ca3af;
}
```

## File Structure

```
src/
  app/
    layout.tsx          # Root layout, font loading, metadata
    page.tsx            # Single page, composes all sections
    globals.css         # CSS variables, resets, font-face
  components/
    Navbar/
      Navbar.tsx
      Navbar.module.css
    Hero/
      Hero.tsx
      Hero.module.css
    Services/
      Services.tsx
      Services.module.css
    Process/
      Process.tsx
      Process.module.css
    Benefits/
      Benefits.tsx
      Benefits.module.css
    Footer/
      Footer.tsx
      Footer.module.css
    ui/
      Button.tsx
      Button.module.css
      Badge.tsx
      Badge.module.css
      Card.tsx
      Card.module.css
```

## Page Sections (Top to Bottom)

### 1. Navbar

- Fixed position at top with backdrop blur on scroll
- Logo: "Advanta Labs" (left)
- Navigation links: Home, About, Contact (center)
- CTA button: "Book a call" (right)
- Mobile: hamburger menu with slide-out drawer
- Background becomes semi-transparent on scroll via scroll listener

### 2. Hero Section

- Full viewport height (100vh)
- Badge pill at top: "New" + "AI Readiness Assessment"
- Headline: "Intelligent Automation for Modern Businesses."
- Subtitle: "Advanta Labs brings AI automation to your fingertips & streamline tasks."
- CTA button: "Get in touch"
- Background: subtle cyan gradient overlay fading from top to transparent
- Fade-in + slide-up animation on load

### 3. Services Section

- Section label: "Our Services"
- Section heading: "AI Solutions That Take Your Business to the Next Level"
- Section subtext: "We design, develop, and implement automation tools that help you work smarter, not harder"
- 4 service cards in a 2x2 grid (stacks to 1 column on mobile)

**Card 1 - Workflow Automation:**
- Category tag: "Workflow Automation"
- Heading: "Automate repetitive tasks"
- Description: "We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors."
- Tags: "Internal Task Bots" | "100+ Automations"
- Decorative UI mockup showing task list interface

**Card 2 - AI Assistant:**
- Category tag: "AI Assistant"
- Heading: "Delegate Daily Tasks"
- Description: "From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster."
- Tags: "Summaries" | "Scheduling" | "Many more"
- Decorative UI mockup showing chat interface

**Card 3 - Sales & Marketing:**
- Category tag: "Sales & Marketing"
- Heading: "Accelerate Sales Growth"
- Description: "AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence."
- Tags: "Leads" | "Content" | "Social post"
- Decorative UI mockup showing lead list interface

**Card 4 - Custom Projects:**
- Category tag: "Custom Projects"
- Heading: "Build Smarter Systems"
- Description: "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals."
- Tags: "Strategy" | "Custom AI" | "Consulting"
- Decorative UI mockup showing project dashboard

### 4. Process Section

- Section label: "Our Process"
- Section heading: "Our Simple, Smart, and Scalable Process"
- Section subtext: "We design, develop, and implement automation tools that help you work smarter, not harder"
- Horizontal carousel/slider with prev/next buttons and dot indicators
- 4 steps, each with:

**Step 1 - Smart Analyzing:**
- Description: "We assess your needs and identify AI solutions to streamline workflows and improve efficiency."
- Decorative UI: workflow analysis visualization

**Step 2 - AI Development:**
- Description: "Our team builds intelligent automation systems tailored to your business processes."
- Decorative UI: code snippet visualization

**Step 3 - Seamless Integration:**
- Description: "We smoothly integrate AI solutions into your existing infrastructure with minimal disruption."
- Decorative UI: integration diagram

**Step 4 - Continuous Optimization:**
- Description: "We refine performance, analyze insights, and enhance automation for long-term growth."
- Decorative UI: dashboard with status indicators

### 5. Benefits Section

- Section label: "Benefits"
- Section heading: "The Key Benefits of AI for Your Business Growth"
- Section subtext: "Discover how AI automation enhances efficiency, reduces costs, and drives business growth with smarter, faster processes."
- 6 cards in a 3x2 grid (2x3 on tablet, 1x6 on mobile)

Cards:
1. **Increased Productivity** - "Gain actionable insights with AI-driven analytics to improve decision-making and strategy."
2. **Better Customer Experience** - "Personalized AI interactions improve response times, customer engagement, and overall satisfaction."
3. **24/7 Availability** - "AI-powered systems operate around the clock, ensuring seamless support and execution without downtime."
4. **Cost Reduction** - "AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation for better profitability."
5. **Data-Driven Insights** - "Leverage AI to analyze vast data sets, identify trends, and make smarter, faster, and more accurate business decisions."
6. **Scalability & Growth** - "AI adapts to your business needs, allowing you to scale efficiently without increasing workload or costs."

### 6. Footer

- 4-column layout (stacks on mobile)
- **Left column:** Logo + tagline ("Automate Smarter, Optimize Faster, and Grow Stronger.") + newsletter form (email input + "Subscribe" button)
- **Links column:** Services, Process, Benefits (anchor links)
- **Pages column:** Home, About, Contact
- **Socials column:** LinkedIn
- **Copyright bar:** "© Advanta Labs - All rights reserved"

## Animations (Framer Motion)

- **Scroll reveals:** All sections fade-in + slide-up (20px) as they enter viewport using IntersectionObserver
- **Staggered children:** Cards within grids animate in sequence with 100ms delay between each
- **Hover states:** Cards scale to 1.02 + border color transitions to cyan
- **Navbar:** Background opacity and blur transition on scroll (transparent at top, solid on scroll)
- **Process carousel:** Smooth horizontal slide transitions with spring physics
- **Hero:** Fade-in + slide-up on initial load (no scroll trigger)
- **Gradient effects:** Subtle animated gradient pulse on hero background

## Responsive Breakpoints

- **Desktop:** 1200px+ (full layouts, 2x2 and 3x2 grids, horizontal nav)
- **Tablet:** 768-1199px (adjusted grids, 2-column where possible, still horizontal nav)
- **Mobile:** <768px (single column, hamburger nav with drawer, reduced type scale)

## Typography Scale

- Hero headline: 4.5rem (desktop), 3rem (mobile)
- Section headings: 2.5rem (desktop), 1.75rem (mobile)
- Card headings: 1.25rem
- Body text: 1rem
- Small/tags: 0.875rem
- Micro/labels: 0.75rem

## Decisions

- Single-page architecture (all sections on one route)
- CSS Modules over Tailwind for styling
- Framer Motion for moderate animation level
- Same copy/messaging from the original site
- Decorative UI mockups in service/process cards will be simplified CSS illustrations (not screenshots)
- Build first, deploy to Vercel later
