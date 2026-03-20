"use client";

import { Button } from "@/components/ui/Button";
import styles from "./Footer.module.css";

const LINK_SECTIONS = [
  { heading: "Links", links: [{ label: "Services", href: "#services" }, { label: "Process", href: "#process" }, { label: "Benefits", href: "#benefits" }] },
  { heading: "Pages", links: [{ label: "Home", href: "#hero" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }] },
  { heading: "Socials", links: [{ label: "LinkedIn", href: "https://linkedin.com/company/advantalabs", external: true }] },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.brandCol}>
          <div className={styles.logo}>Advanta<span className={styles.logoAccent}>Labs</span></div>
          <p className={styles.tagline}>Automate Smarter, Optimize Faster, and Grow Stronger.</p>
          <p className={styles.newsletterLabel}>Join our newsletter</p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="name@email.com" className={styles.newsletterInput} aria-label="Email for newsletter" />
            <Button variant="primary" size="small" type="submit">Subscribe</Button>
          </form>
        </div>
        {LINK_SECTIONS.map((section) => (
          <div key={section.heading} className={styles.linkCol}>
            <p className={styles.colHeading}>{section.heading}</p>
            {section.links.map((link) => (
              <a key={link.label} href={link.href} className={styles.footerLink} {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.copyright}>&copy; Advanta Labs - All rights reserved</div>
    </footer>
  );
}
