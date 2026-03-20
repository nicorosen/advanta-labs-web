"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BenefitCard } from "./BenefitCard";
import styles from "./Benefits.module.css";

const BENEFITS = [
  { icon: "\u26A1", title: "Increased Productivity", description: "Gain actionable insights with AI-driven analytics to improve decision-making and strategy." },
  { icon: "\u2764", title: "Better Customer Experience", description: "Personalized AI interactions improve response times, customer engagement, and overall satisfaction." },
  { icon: "\u23F0", title: "24/7 Availability", description: "AI-powered systems operate around the clock, ensuring seamless support and execution without downtime." },
  { icon: "\uD83D\uDCB0", title: "Cost Reduction", description: "AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation for better profitability." },
  { icon: "\uD83D\uDCC8", title: "Data-Driven Insights", description: "Leverage AI to analyze vast data sets, identify trends, and make smarter, faster, and more accurate business decisions." },
  { icon: "\uD83D\uDE80", title: "Scalability & Growth", description: "AI adapts to your business needs, allowing you to scale efficiently without increasing workload or costs." },
];

export function Benefits() {
  return (
    <section id="benefits" className={styles.section}>
      <ScrollReveal><SectionHeader label="Benefits" heading="The Key Benefits of AI for Your Business Growth" subtext="Discover how AI automation enhances efficiency, reduces costs, and drives business growth with smarter, faster processes." /></ScrollReveal>
      <div className={styles.grid}>
        {BENEFITS.map((benefit, i) => (<ScrollReveal key={benefit.title} delay={i * 0.1}><BenefitCard {...benefit} /></ScrollReveal>))}
      </div>
    </section>
  );
}
