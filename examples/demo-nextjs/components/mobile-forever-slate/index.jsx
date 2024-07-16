import { Trans } from "react-i18next";
import styles from "./index.module.css";

export default function MobileForeverSlate({ propsFromN, head, tail, dynamicWidth, t }) {
  const contentItemStyle = {
    width: dynamicWidth ? 280 : "100%",
    flexShrink: 0,
  };
  return <div
    className={styles.wrapper}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    <p className={styles.desc}><Trans i18nKey="s_mforever_desc" t={t}><a ref={head} href="https://github.com/wswmsword/postcss-mobile-forever">zero</a>1<a href="https://github.com/wswmsword/scale-view">2</a>3</Trans></p>
    <ul className={styles.links}>
      <li><a href="https://wswmsword.github.io/examples/mobile-forever/vanilla/">{t("s_mf_doc_t1")}</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%A8%A1%E7%89%88%E5%92%8C%E8%8C%83%E4%BE%8B">{t("s_mf_doc_t2")}</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%AE%89%E8%A3%85">{t("s_mf_doc_t3")}</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0">{t("s_mf_doc_t4")}</a></li>
      <li><a href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E4%B8%8E%E5%8F%82%E4%B8%8E%E5%BC%80%E5%8F%91">{t("s_mf_doc_t5")}</a></li>
      <li><a ref={tail} href="https://github.com/wswmsword/postcss-mobile-forever?tab=readme-ov-file#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E8%8C%83%E4%BE%8B%E5%92%8C%E5%8E%9F%E7%90%86">{t("s_mf_doc_t6")}</a></li>
    </ul>
  </div>;
}