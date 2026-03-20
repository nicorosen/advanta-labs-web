import styles from "./ProcessStep.module.css";

interface ProcessStepProps {
  stepNumber: number;
  title: string;
  description: string;
  decorativeType: "analyze" | "develop" | "integrate" | "optimize";
}

function DecorativeUI({ type }: { type: ProcessStepProps["decorativeType"] }) {
  if (type === "analyze") {
    return (
      <div className={styles.decorative} aria-hidden="true">
        <div className={styles.decorativeRow}><span className={styles.dot} /><span>Analyzing current workflow...</span></div>
        <div className={styles.decorativeRow}><span className={styles.dot} /><span>Process check</span></div>
        <div className={styles.decorativeRow}><span className={styles.dot} /><span>Manual work detected</span></div>
        <div className={styles.decorativeRow}><span className={styles.dot} /><span>Repetitive task found</span></div>
      </div>
    );
  }
  if (type === "develop") {
    return (
      <div className={styles.decorative} aria-hidden="true">
        <pre className={styles.codeBlock}>{`class AutomationTrigger:\n    def check_trigger(self):\n        return self.active\n    def get_status(self):\n        return "running"`}</pre>
      </div>
    );
  }
  if (type === "integrate") {
    return (
      <div className={styles.decorative} aria-hidden="true">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ padding: "0.5rem 1rem", border: "1px solid var(--color-primary)", borderRadius: "var(--radius-sm)", color: "var(--color-primary)" }}>Our solution</div>
          <span style={{ color: "var(--color-text-muted)" }}>&rarr;</span>
          <div style={{ padding: "0.5rem 1rem", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>Your stack</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.decorative} aria-hidden="true">
      <div className={styles.decorativeRow}><span className={styles.dot} /><span>Chatbot system</span><span style={{ marginLeft: "auto", color: "var(--color-primary)" }}>+20% efficiency</span></div>
      <div className={styles.decorativeRow}><span className={styles.dot} /><span>Workflow system</span><span style={{ marginLeft: "auto" }}>Update available</span></div>
      <div className={styles.decorativeRow}><span className={styles.dot} /><span>Sales system</span><span style={{ marginLeft: "auto", color: "#22c55e" }}>Up to date</span></div>
    </div>
  );
}

export function ProcessStep({ stepNumber, title, description, decorativeType }: ProcessStepProps) {
  return (
    <div className={styles.step}>
      <p className={styles.stepNumber}>Step {stepNumber}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <DecorativeUI type={decorativeType} />
    </div>
  );
}
