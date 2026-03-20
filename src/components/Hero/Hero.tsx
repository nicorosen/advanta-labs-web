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
