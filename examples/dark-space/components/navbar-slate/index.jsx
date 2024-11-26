import { Trans } from "react-i18next";
import styles from "./index.module.css";
import { MiniBack } from "hanav";

export default function NavbarSlate({ propsFromN, head, tail, dynamicWidth, t, miniBack }) {
  const contentItemStyle = {
    width: dynamicWidth ? 400 : "100%",
    flexShrink: 0,
  };
  return <div
    className={styles.wrapper}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    {miniBack && miniBack(head)}
    <p className={styles.navDesc}>{t("slate_navbar_desc")}</p>
    <div className={styles.feats}>
      <FeatSlate e="🍯" t={t("smooth_t")} d={t("s_nb_smooth_d")} />
      <FeatSlate e="🎹" t={t("key_t")} d={<Trans i18nKey="s_nb_key_d" t={t}>0<kbd>1</kbd>two<kbd>3</kbd>4</Trans>} />
      <FeatSlate e="♿️" t={t("a11y_t")} d={t("s_nb_a11y_d")} />
      <FeatSlate e="🎨" t={t("style_t")} d={t("s_nb_style_d")} />
    </div>
    <span className={styles.title}>{t("o")}</span>
    <ul className={styles.links}>
      <li><a ref={miniBack == null ? head : null} href={t("s_nb_doc_t1_link")}>{t("s_nb_doc_t1")}</a></li>
      <li><a href={t("s_nb_doc_t2l")}>{t("s_nb_doc_t2")}</a></li>
      <li><a href={t("s_nb_doc_t3l")}>{t("s_nb_doc_t3")}</a></li>
      <li><a ref={tail} href={t("s_nb_doc_t4l")}>{t("s_nb_doc_t4")}</a></li>
    </ul>
  </div>;
}

function FeatSlate({ e, t, d }) {
  return <div className={styles.feat}>
    <div className={styles.icon_wrap}>{e}</div>
    <div>
      <div className={styles.title}>{t}</div>
      <div className={styles.desc}>{d}</div>
    </div>
  </div>;
}