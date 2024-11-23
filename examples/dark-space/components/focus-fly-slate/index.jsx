import styles from "./index.module.css";
import { forwardRef } from "react";

export default function FocusFlySlate({ propsFromN, head, tail, dynamicWidth, t, className, miniBack }) {
  const contentItemStyle = {
    width: dynamicWidth ? 480 : "100%",
    flexShrink: 0,
  };
  return <>{miniBack && <div className={styles.bkWrapper}>{miniBack(head)}</div>}<ul
    className={`${styles.wrapper} ${className}`}
    {...propsFromN}
    style={{ ...propsFromN.style, ...contentItemStyle }}>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-hot"
        t={t("s_ffly_t1")} d={t("s_ffly_d1")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-dialog"
        t={t("s_ffly_t2")}
        d={t("s_ffly_d2")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-nav"
        t={t("s_ffly_t3")} d={t("s_ffly_d3")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-tabs"
        t={t("s_ffly_t4")} d={t("s_ffly_d4")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-player"
        t={t("s_ffly_t5")} d={t("s_ffly_d5")} />
    </li>
    <li>
      <DemoSlate
        href="https://wswmsword.github.io/examples/focus-fly/#h-scroll"
        t={t("s_ffly_t6")} d={t("s_ffly_d6")}
        ref={tail} />
    </li>
  </ul></>;
}

const DemoSlate = forwardRef(function DemoSlate({ href, t, d }, ref) {
  return <a href={href} ref={ref}>
    <div className={styles.title}>{t}</div>
    <div className={styles.desc}>{d}</div>
  </a>
})