import styles from "./Logo.module.css";

interface LogoProps {
  size?: "default" | "large";
}

export function Logo({ size = "default" }: LogoProps) {
  return (
    <span className={`${styles.logo} ${size === "large" ? styles.large : ""}`}>
      <svg
        className={styles.icon}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill="#23decb" />
        <path
          d="M16 6L24 24H18.5L16.8 20H15.2L13.5 24H8L16 6Z"
          fill="#000000"
        />
        <path
          d="M16 11L19.5 20H12.5L16 11Z"
          fill="#23decb"
        />
      </svg>
      <span className={styles.text}>
        Advanta Labs
      </span>
    </span>
  );
}
