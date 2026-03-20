import { Badge } from "@/components/ui/Badge";
import styles from "./ServiceCard.module.css";
import { ReactNode } from "react";

interface ServiceCardProps {
  category: string;
  heading: string;
  description: string;
  tags: string[];
  mockup: ReactNode;
}

export function ServiceCard({ category, heading, description, tags, mockup }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.categoryTag}>{category}</p>
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>
      {mockup}
    </div>
  );
}
