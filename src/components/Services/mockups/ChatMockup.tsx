import styles from "./Mockup.module.css";

export function ChatMockup() {
  return (
    <div className={styles.mockup} aria-hidden="true">
      <div className={styles.chatBubble}>What can I help with?</div>
      <div className={styles.chatBubble}>Help with customer handling or system changes</div>
      <div className={styles.chatInput}>
        <span style={{ opacity: 0.5 }}>Generate a...</span>
      </div>
      <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.5rem" }}>
        <span className={styles.tag}>Analyze</span>
        <span className={styles.tag}>Research</span>
        <span className={styles.tag}>E-mail</span>
      </div>
    </div>
  );
}
