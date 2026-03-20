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
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your name" className={styles.input} aria-label="Your name" />
              <input type="email" placeholder="Your email" className={styles.input} aria-label="Your email" />
              <textarea placeholder="Your message" className={styles.textarea} aria-label="Your message" />
              <Button variant="primary" type="submit">Send Message</Button>
            </form>
          </div>
          <div className={styles.infoSide}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}><a href="mailto:hello@advantalabs.co">hello@advantalabs.co</a></span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>LinkedIn</span>
              <span className={styles.infoValue}><a href="https://linkedin.com/company/advantalabs" target="_blank" rel="noopener noreferrer">Advanta Labs</a></span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
