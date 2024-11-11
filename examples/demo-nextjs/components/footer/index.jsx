import styles from "./index.module.css";

export default function Footer() {
  return <>
    <footer className={styles.footer}>✨Powered by <a href="https://github.com/wswmsword">wswmsword</a>✨</footer>
    <div className={styles.hana}>
      <a href="https://github.com/wswmsword/hanav?tulip">🌷</a>
      <a href="https://github.com/wswmsword/hanav?hyacinth">🪻</a>
      <a href="https://github.com/wswmsword/hanav?rose">🌹</a>
      <a href="https://github.com/wswmsword/hanav?sunflower">🌻</a>
      <a href="https://github.com/wswmsword/hanav?tulip">🌷</a>
    </div>
  </>;
}