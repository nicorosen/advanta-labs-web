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
            <p className={styles.body}>Advanta Labs is a team of AI specialists dedicated to helping corporations harness the power of intelligent automation. We combine deep technical expertise with strategic consulting to deliver solutions that drive real business outcomes. From workflow automation to custom AI systems, we partner with enterprises to build smarter, faster, and more resilient operations.</p>
          </div>
          <div className={styles.graphic} aria-hidden="true">
            <div className={styles.pattern}>
              {Array.from({ length: 9 }).map((_, i) => (<div key={i} className={styles.patternCell} />))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
