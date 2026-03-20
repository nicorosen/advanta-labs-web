"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProcessStep } from "./ProcessStep";
import styles from "./Process.module.css";

const STEPS = [
  { title: "Smart Analyzing", description: "We assess your needs and identify AI solutions to streamline workflows and improve efficiency.", decorativeType: "analyze" as const },
  { title: "AI Development", description: "Our team builds intelligent automation systems tailored to your business processes.", decorativeType: "develop" as const },
  { title: "Seamless Integration", description: "We smoothly integrate AI solutions into your existing infrastructure with minimal disruption.", decorativeType: "integrate" as const },
  { title: "Continuous Optimization", description: "We refine performance, analyze insights, and enhance automation for long-term growth.", decorativeType: "optimize" as const },
];

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

export function Process() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(STEPS.length - 1, current + 1));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section id="process" className={styles.section}>
      <ScrollReveal>
        <SectionHeader label="Our Process" heading="Our Simple, Smart, and Scalable Process" subtext="We design, develop, and implement automation tools that help you work smarter, not harder" />
      </ScrollReveal>
      <ScrollReveal>
        <div className={styles.carouselWrapper} role="region" aria-label="Process steps" onKeyDown={handleKeyDown} tabIndex={0}>
          <div className={styles.carousel}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={(_, info) => { if (info.offset.x < -50 && current < STEPS.length - 1) next(); if (info.offset.x > 50 && current > 0) prev(); }} style={{ width: "100%" }}>
                <div aria-live="polite">
                  <ProcessStep stepNumber={current + 1} {...STEPS[current]} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.controls}>
            <button className={styles.navButton} onClick={prev} disabled={current === 0} aria-label="Previous step">&larr; Previous</button>
            <div className={styles.dots}>
              {STEPS.map((_, i) => (<button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ""}`} onClick={() => goTo(i)} aria-label={`Go to step ${i + 1}`} />))}
            </div>
            <button className={styles.navButton} onClick={next} disabled={current === STEPS.length - 1} aria-label="Next step">Next &rarr;</button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
