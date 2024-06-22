import styles from "./index.module.css";

export default function CenterBox({ children }) {
  return <div className={styles.centerBox}>{children}</div>
}