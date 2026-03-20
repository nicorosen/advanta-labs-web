"use client";

import { useState } from "react";
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
  const [nlStatus, setNlStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNlStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });

      if (!res.ok) throw new Error("Failed");
      setNlStatus("sent");
      form.reset();
    } catch {
      setNlStatus("error");
    }
  }

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
          {nlStatus === "sent" ? (
            <p className={styles.newsletterSuccess}>
              Subscribed! Check your email.
            </p>
          ) : (
            <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
              <input
                type="email"
                name="email"
                placeholder="name@email.com"
                className={styles.newsletterInput}
                aria-label="Email for newsletter"
                required
              />
              <Button
                variant="primary"
                size="small"
                type="submit"
                disabled={nlStatus === "sending"}
              >
                {nlStatus === "sending" ? "..." : "Subscribe"}
              </Button>
            </form>
          )}
          {nlStatus === "error" && (
            <p className={styles.newsletterError}>
              Something went wrong. Try again.
            </p>
          )}
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
