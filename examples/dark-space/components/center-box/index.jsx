import styles from "./index.module.css";

export default function CenterBox({ children, className, ...props }) {
  return <div className={`${styles.centerBox} ${className}`} {...props}>{children}</div>
}