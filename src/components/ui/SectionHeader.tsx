import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  label: string;
  heading: string;
  subtext?: string;
}

export function SectionHeader({ label, heading, subtext }: SectionHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.heading}>{heading}</h2>
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </div>
  );
}
