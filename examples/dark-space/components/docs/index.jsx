import { useTranslation } from "@/i18n";
import styles from "./index.module.css";
import { Trans } from "react-i18next/TransWithoutContext";

export default async function Docs({ lng }) {
  const { t } = await useTranslation(lng);
  const desc = t("desc");
  return <>
    <h1 className={styles.txt}>hanav</h1>
    <pre className={styles.install}>npm install hanav</pre>
    <p className={styles.txt}>{desc}</p>
    <div className={styles.feats}>
      <FeatSlate emoji="🍯" title={t("smooth_t")} desc={t("smooth_d")} />
      <FeatSlate emoji="🎹" title={t("key_t")} desc={<Trans i18nKey="key_d" t={t}>0<kbd>1</kbd>2<kbd>3</kbd>4</Trans>} />
      <FeatSlate emoji="♿️" title={t("a11y_t")} desc={t("a11y_d")} />
      <FeatSlate emoji="🎨" title={t("style_t")} desc={t("style_d")} />
      <FeatSlate emoji="📱" title={t("mobile_t")} desc={t("mobile_d")} />
      <FeatSlate emoji="🚀" title={t("dx_t")} desc={t("dx_d")} />
    </div>
    <p className={styles.txt}><Trans i18nKey="usage" t={t}>0<a href="https://github.com/wswmsword/hanav">1</a>2</Trans></p>
    <p className={styles.txt}>{t("stars")}</p>
    <div aria-hidden="true" className={`${styles.presentation} ${styles.textShadow}`}>HANAV</div>
    <div aria-hidden="true" className={styles.presentation2}>HANAV</div>
  </>;
}

function FeatSlate({ emoji, title, desc }) {
  return <div className={styles.feat}>
  <p className={styles.emoji}>{emoji}</p>
  <p className={styles.featTt}>{title}</p>
  <p className={styles.featDesc}>{desc}</p>
</div>
}