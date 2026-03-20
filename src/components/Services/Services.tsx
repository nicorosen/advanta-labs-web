"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceCard } from "./ServiceCard";
import { TaskListMockup } from "./mockups/TaskListMockup";
import { ChatMockup } from "./mockups/ChatMockup";
import { LeadListMockup } from "./mockups/LeadListMockup";
import { ProjectDashMockup } from "./mockups/ProjectDashMockup";
import styles from "./Services.module.css";

const SERVICES = [
  {
    category: "Workflow Automation",
    heading: "Automate repetitive tasks",
    description: "We help you streamline internal operations by automating manual workflows like data entry, reporting, and approval chains saving time and cutting down errors.",
    tags: ["Internal Task Bots", "100+ Automations"],
    mockup: <TaskListMockup />,
  },
  {
    category: "AI Assistant",
    heading: "Delegate Daily Tasks",
    description: "From managing calendars to drafting emails and summarizing meetings, our AI assistants work around the clock to keep your business running smarter and faster.",
    tags: ["Summaries", "Scheduling", "Many more"],
    mockup: <ChatMockup />,
  },
  {
    category: "Sales & Marketing",
    heading: "Accelerate Sales Growth",
    description: "AI tools for lead generation, personalized outreach, and automated content creation that scales your sales efforts and builds stronger brand presence.",
    tags: ["Leads", "Content", "Social post"],
    mockup: <LeadListMockup />,
  },
  {
    category: "Custom Projects",
    heading: "Build Smarter Systems",
    description: "Whether you're starting from scratch or enhancing an existing system, we offer strategic consulting and develop custom AI projects aligned with your unique goals.",
    tags: ["Strategy", "Custom AI", "Consulting"],
    mockup: <ProjectDashMockup />,
  },
];

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <ScrollReveal>
        <SectionHeader
          label="Our Services"
          heading="AI Solutions That Take Your Business to the Next Level"
          subtext="We design, develop, and implement automation tools that help you work smarter, not harder"
        />
      </ScrollReveal>
      <div className={styles.grid}>
        {SERVICES.map((service, i) => (
          <ScrollReveal key={service.category} delay={i * 0.1}>
            <ServiceCard {...service} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
