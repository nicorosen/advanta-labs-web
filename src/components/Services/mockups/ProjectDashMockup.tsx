import styles from "./Mockup.module.css";

export function ProjectDashMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.chatBubble}>Hey David! Here is your custom project</div>
      <div className={styles.row}>
        <span className={`${styles.dot} ${styles.dotCyan}`} />
        <span>Customer Support Chatbot</span>
        <span className={styles.label}>90%</span>
      </div>
      <div style={{ marginTop: "0.75rem" }}>
        <div className={styles.label}>Schedule</div>
        <div className={styles.row}>
          <span>Mo Tu We Th Fr Sa Su</span>
        </div>
        <div className={styles.label}>No meeting today.</div>
      </div>
    </div>
  );
}
