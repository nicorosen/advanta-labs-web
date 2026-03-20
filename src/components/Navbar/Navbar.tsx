"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
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
        <a href="#hero" className={styles.logoLink}>
          <Logo />
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
