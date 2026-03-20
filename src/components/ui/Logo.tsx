import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
  size?: "default" | "large";
}

export function Logo({ size = "default" }: LogoProps) {
  const width = size === "large" ? 180 : 140;
  const height = size === "large" ? 48 : 36;

  return (
    <span className={`${styles.logo} ${size === "large" ? styles.large : ""}`}>
      <Image
        src="/logo.png"
        alt="Advanta Labs"
        width={width}
        height={height}
        className={styles.logoImage}
        priority
      />
    </span>
  );
}
