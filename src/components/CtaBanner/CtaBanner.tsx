"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import styles from "./CtaBanner.module.css";

export function CtaBanner() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.content}>
          <h2 className={styles.heading}>Ready to Transform Your Business?</h2>
          <p className={styles.subtext}>Let&apos;s discuss how AI automation can streamline your operations and accelerate growth.</p>
          <Button variant="inverted" href="#contact">Book a call</Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
