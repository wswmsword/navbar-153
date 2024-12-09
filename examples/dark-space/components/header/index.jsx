"use client"

import styles from "./index.module.css";
import Nav from "./nav";
import MiniNav from "./mini-nav";
import { useEffect, useState } from "react";
import CenterBox from "../center-box";
import { useTranslation } from "@/i18n/client";
import { Trans } from "react-i18next";

export default function Header({ lng, lowerCaseLng }) {
  
  const [motion, setMotion] = useState(true);
  const [dynamicWidth, setD] = useState(false);
  const [close, setClose] = useState(false);
  const [onlyKeyFocus, setOnly] = useState(true);
  const [hasCustomYTrans, setY] = useState(false);
  const [hasCustomXTrans, setX] = useState(false);
  const [mini, setMini] = useState(null);
  const [small, setSm] = useState(false);

  const { t } = useTranslation(lng);

  useEffect(() => {
    // 检测操作系统是否打开了“减弱动态效果”
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    handleReducedMotionChange(motionMedia);
    motionMedia.addListener(handleReducedMotionChange);

    // 检测媒体查询
    const screenMedia = window.matchMedia("(max-width: 520px)");
    handleSmallScreen(screenMedia);
    screenMedia.addListener(handleSmallScreen);


    return () => {
      motionMedia.removeListener(handleReducedMotionChange);
      screenMedia.removeListener(handleSmallScreen);
    }

    function handleReducedMotionChange(mql) {
      setMotion(!mql.matches);
    }

    function handleSmallScreen(mql) {
      setMini(mql.matches);
      setSm(mql.matches);
    }
  }, []);

  return <>
    <Nav
      mini={mini}
      small={small}
      onlyKeyFocus={onlyKeyFocus}
      dynamicWidth={dynamicWidth}
      close={close}
      t={t}
      motion={motion}
      hasCustomXTrans={hasCustomXTrans}
      hasCustomYTrans={hasCustomYTrans} />
    <MiniNav mini={mini} lowerCaseLng={lowerCaseLng} t={t} />
    <div className={`${styles.placeholder} ${mini == null ? "" : mini ? styles.smallPlaceholder : ""}`} />
    <CenterBox className={styles.form}>
      <label className={styles.formItem}><input type="checkbox" checked={mini || false} onChange={() => setMini(v => !v)} /> {t("mini")}</label>
      <label className={styles.formItem}><input disabled={mini} type="checkbox" checked={hasCustomXTrans} onChange={() => setX(v => !v)} /> xTrans</label>
      <label className={styles.formItem}><input disabled={mini} type="checkbox" checked={hasCustomYTrans} onChange={() => setY(v => !v)} /> yTrans</label>
      <label className={styles.formItem}><input disabled={mini} type="checkbox" checked={dynamicWidth} onChange={() => setD(v => !v)} /> dynamicWidth</label>
      <label className={styles.formItem}><input disabled={mini} type="checkbox" checked={close} onChange={() => setClose(v => !v)} /> close</label>
      <label className={styles.formItem}><input disabled={mini} type="checkbox" checked={onlyKeyFocus} onChange={() => setOnly(v => !v)} /> onlyKeyFocus</label>
      <div className={styles.motionWrapper}>
        <label className={styles.formItem} title={t("tooltip")}><input disabled={mini} type="checkbox" checked={motion} onChange={() => setMotion(v => !v)} /> {t("motion")}</label>
        <span className={styles.tooltip} role="presentation"><Trans i18nKey="tooltip2" t={t}>0<a className={styles.tLink} href="https://stackoverflow.com/a/59709067">1</a>2</Trans></span>
      </div>
      <a href="https://codesandbox.io/p/sandbox/rn6r6d">
        <img alt="Edit hanav-demo" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
      </a>
    </CenterBox>
  </>;
}