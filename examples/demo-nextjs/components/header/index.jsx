"use client"

import styles from "./index.module.css";
import { NavBar, Trigger, Content, Item, CustomXMotionContent, CustomYMotionContent, CustomMotionContent, ReducedMotionContent } from "hanav";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate"
import { useEffect, useState } from "react";
import CenterBox from "../center-box";
import { useTranslation } from "@/i18n/client";
import { Trans } from "react-i18next";
import Link from "next/link";

export default function Header({ lng, lowerCaseLng }) {
  
  const [motion, setMotion] = useState(true);
  const [dynamicWidth, setD] = useState(false);
  const [close, setClose] = useState(false);
  const [onlyKeyFocus, setOnly] = useState(true);
  const [hasCustomYTrans, setY] = useState(false);
  const [hasCustomXTrans, setX] = useState(false);
  const [small, setSm] = useState(false);

  const { t } = useTranslation(lng);

  const FinalC = (() => {
    if (!motion) return ReducedMotionContent;
    if (hasCustomXTrans && hasCustomYTrans) return CustomMotionContent;
    if (hasCustomXTrans) return CustomXMotionContent;
    if (hasCustomYTrans) return CustomYMotionContent;
    return Content;
  })();

  // 检测操作系统是否打开了“减弱动态效果”
  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    handleReducedMotionChange(motionMedia);
    motionMedia.addListener(handleReducedMotionChange);

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
      setSm(mql.matches);
    }
  }, []);

  return <><div className={styles.header}> 
    <NavBar className={styles.nav} gap={small ? 0 : 16} onlyKeyFocus={onlyKeyFocus} dur={.4} dynamicWidth={dynamicWidth} close={close}>
      <Trigger className={styles.triggerWrapper}>
        <a href="https://github.com/wswmsword/hanav" className={styles.navLink}>Repo</a>
        <Item><button className={styles.navBtn}>Hanav</button></Item>
        <Item><button className={styles.navBtn}><span className={styles.onlyDesktop}>Postcss-</span>Mobile-Forever</button></Item>
        <Item><button className={styles.navBtn}>Focus-Fly</button></Item>
      </Trigger>
      <FinalC
        className={styles.panelsWrapperInner}
        xTrans={{
          opacity: [0, 1],
          transform: ["translate(0)", "translateX(-280px)", "translateX(280px)"],
        }}
        yTrans={{
          opacity: [0, 1],
          transform: ["rotateX(-30deg) scale(.9)", "rotateX(0deg) scale(1)"],
          transformOrigin: "top center",
        }}>
        <Item>
          {(props, head, tail) =>
            <NavbarSlate
              t={t}
              dynamicWidth={dynamicWidth}
              propsFromN={props}
              head={head}
              tail={tail} />}
        </Item>
        <Item>
          {(props, head, tail) =>
            <MobileForeverSlate
              t={t}
              dynamicWidth={dynamicWidth}
              propsFromN={props}
              head={head}
              tail={tail} />}
        </Item>
        <Item>
        {(props, head, tail) =>
          <FocusFlySlate
            t={t}
            dynamicWidth={dynamicWidth}
            propsFromN={props}
            head={head}
            tail={tail} />}
        </Item>
      </FinalC>
    </NavBar>
  </div><div className={styles.placeholder} />
  <CenterBox className={styles.form}>
    <label className={styles.formItem}><input type="checkbox" checked={hasCustomXTrans} onChange={() => setX(v => !v)} /> xTrans</label>
    <label className={styles.formItem}><input type="checkbox" checked={hasCustomYTrans} onChange={() => setY(v => !v)} /> yTrans</label>
    <label className={styles.formItem}><input type="checkbox" checked={dynamicWidth} onChange={() => setD(v => !v)} /> dynamicWidth</label>
    <label className={styles.formItem}><input type="checkbox" checked={close} onChange={() => setClose(v => !v)} /> close</label>
    <label className={styles.formItem}><input type="checkbox" checked={onlyKeyFocus} onChange={() => setOnly(v => !v)} /> onlyKeyFocus</label>
    <div className={styles.motionWrapper}>
      <label className={styles.formItem} title={t("tooltip")}><input type="checkbox" checked={motion} onChange={() => setMotion(v => !v)} /> {t("motion")}</label>
      <span className={styles.tooltip} role="presentation"><Trans i18nKey="tooltip2" t={t}>0<a className={styles.tLink} href="https://stackoverflow.com/a/59709067">1</a>2</Trans></span>
    </div>
    {lowerCaseLng === "en" ?
      <Link href="/zh-cn" className={styles.lang_switch} lang="zh-CN">简体中文</Link> :
      <Link href="/en" className={styles.lang_switch} lang="en">English</Link>}
  </CenterBox></>;
}