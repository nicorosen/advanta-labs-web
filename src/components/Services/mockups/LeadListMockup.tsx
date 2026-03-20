import styles from "./Mockup.module.css";

export function LeadListMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span>Mike Taylor</span>
        <span className={styles.label}>Founder</span>
        <span className={styles.tag}>Verified</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span>Thomas Shelby</span>
        <span className={styles.label}>Founder</span>
        <span className={styles.tag}>Verified</span>
      </div>
      <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.75rem" }}>
        <span className={styles.tag}>Draft</span>
        <span className={styles.tag}>Schedule</span>
        <span className={styles.tag}>Sent</span>
      </div>
    </div>
  );
}
