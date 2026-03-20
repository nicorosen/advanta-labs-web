import styles from "./BenefitCard.module.css";

interface BenefitCardProps { icon: string; title: string; description: string; }

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.icon} aria-hidden="true">{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
