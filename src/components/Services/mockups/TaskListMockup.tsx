import styles from "./Mockup.module.css";

export function TaskListMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotGreen}`} />
        <span>Payroll management</span>
        <span className={styles.label}>Due 2nd July</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotYellow}`} />
        <span>Employee Tracking</span>
        <span className={styles.label}>2 days ago</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotRed}`} />
        <span>Social media post</span>
        <span className={styles.label}>Cancelled</span>
      </div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotCyan}`} />
        <span>Lead list</span>
        <span className={styles.label}>70%</span>
      </div>
    </div>
  );
}
