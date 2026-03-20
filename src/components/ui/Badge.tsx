import styles from "./Badge.module.css";

interface BadgeProps {
  variant?: "default" | "outline";
  children: React.ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const classes = [styles.badge, variant === "outline" && styles.outline]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
