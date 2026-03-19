# Advanta Labs Website - Design Spec

## Overview

Replicate the www.advantalabs.co marketing site as a Next.js application. The new site is "inspired by" the original - same messaging and content, same general structure, but with freedom to diverge on design details. Single-page architecture deployed to Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** CSS Modules
- **Fonts:** Figtree (headings, weight 700-900), Inter (body text, weight 400-600), Fragment Mono (code/decorative UI elements), Satoshi (card labels/tags) - via next/font / Google Fonts
- **Animations:** Framer Motion (scroll-triggered reveals, hover effects, transitions)
- **Deployment:** Vercel (build first, deploy later)

## Design Tokens (globals.css)

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
    About/
      About.tsx
      About.module.css
    CtaBanner/
      CtaBanner.tsx
      CtaBanner.module.css
    Contact/
      Contact.tsx
      Contact.module.css
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
- Navigation links (center): Home (#hero), About (#about), Contact (#contact)
- CTA button: "Book a call" (right)
- Mobile: hamburger menu with slide-out drawer
- Background becomes semi-transparent on scroll via scroll listener
- Note: Original site also has "Products" nav item but we are dropping it since all services are covered in the Services section

### 2. Hero Section

- Full viewport height (100vh)
- Badge pill at top: "New" + "AI Readiness Assessment"
- Headline: "Intelligent Automation for Modern Businesses."
- Subtitle: "Advanta Labs brings AI automation to your fingertips & streamline tasks."
- Primary CTA button: "Get in touch" (solid cyan, links to #contact)
- Secondary CTA button: "Learn more" (outlined, links to #services)
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
- Implementation: custom Framer Motion AnimatePresence-based carousel (no external library)
- Mobile: swipe-enabled via Framer Motion drag gestures; degrades to vertical stack below 480px
- Manual navigation only (no auto-advance)
- Accessibility: arrow key navigation between steps, aria-label on prev/next buttons, aria-live region for step content
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

### 6. About Section

- Anchor: `#about`
- Brief company overview section
- Heading: "About Advanta Labs"
- Body text introducing the team and mission, emphasizing AI expertise for corporations
- Optional: team photo placeholder or abstract graphic
- Keep this lightweight since it is a single-page site (not a full about page)

### 7. CTA Banner Section

- Full-width banner with cyan gradient background
- Heading: "Ready to Transform Your Business?"
- Subtext: "Let's discuss how AI automation can streamline your operations and accelerate growth."
- CTA button: "Book a call" (dark background, white text - inverted from the primary button style)
- Centered layout, generous vertical padding

### 8. Contact Section

- Anchor: `#contact`
- Heading: "Get in Touch"
- Simple contact form: Name, Email, Message fields + "Send Message" submit button
- Form is decorative/placeholder in initial build (no backend). Can be wired to a Vercel serverless function or third-party service later.
- Alternately, display email address and LinkedIn link alongside the form

### 9. Footer

- 4-column layout (stacks on mobile)
- **Left column:** Logo + tagline ("Automate Smarter, Optimize Faster, and Grow Stronger.") + newsletter form (email input + "Subscribe" button). Form is placeholder in initial build (no backend integration).
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

## Accessibility

- Skip-to-content link as first focusable element, visually hidden until focused
- Focus rings: 2px solid cyan outline on all interactive elements
- Navbar mobile menu: `aria-expanded` on toggle, focus trap when open
- Process carousel: `aria-label` on prev/next buttons, `aria-live="polite"` region for active step
- Decorative UI mockups in cards: `aria-hidden="true"` (purely visual, no semantic content)
- All images/icons: decorative ones get `aria-hidden`, meaningful ones get `alt` text
- Color contrast: white text on black (#fff on #000) passes WCAG AAA; muted text (#9ca3af on #000) passes AA

## Metadata (SEO)

- Title: "Advanta Labs - AI Enabler for Corporations"
- Description: "Advanta Labs brings intelligent automation to modern businesses. AI strategy, workflow automation, and custom AI solutions."
- Open Graph: title, description, type "website", image (1200x630 placeholder)
- Favicon: simple "A" logo mark in cyan on dark background
- Theme color: #000000

## Dependencies

```text
next@14.x
react@18.x
react-dom@18.x
framer-motion@11.x
typescript@5.x
@types/react@18.x
@types/node@20.x
```

## Decisions

- Single-page architecture (all sections on one route)
- CSS Modules over Tailwind for styling
- Framer Motion for moderate animation level
- Same copy/messaging from the original site
- Decorative UI mockups in service/process cards will be simplified CSS illustrations (not screenshots)
- Build first, deploy to Vercel later
