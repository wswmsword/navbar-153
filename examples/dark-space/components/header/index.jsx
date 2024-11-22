"use client"

import styles from "./index.module.css";
import { NavBar, Trigger, Content, Item, CustomXMotionContent, CustomYMotionContent,
  CustomMotionContent, ReducedMotionContent,
  MiniNavBar, MiniTrigger, MiniItem, MiniContent, MiniMenu, MiniToggle } from "hanav";
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
  const [mini, setMini] = useState(null);
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
      setMini(mql.matches);
      setSm(mql.matches);
    }
  }, []);

  return <><div className={`${styles.header} ${mini == null ? "" : mini ? styles.hide : styles.show}`}> 
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
          <NavbarSlate
            t={t}
            dynamicWidth={dynamicWidth} />
        </Item>
        <Item>
          <MobileForeverSlate
            t={t}
            dynamicWidth={dynamicWidth} />
        </Item>
        <Item>
          <FocusFlySlate
            t={t}
            className={styles.mobileFfSlate}
            dynamicWidth={dynamicWidth} />
        </Item>
      </FinalC>
    </NavBar>
  </div><div className={`${styles.placeholder} ${mini ? styles.smallPlaceholder : ""}`} />
  <MiniNavBar className={`${styles.miniNav} ${mini == null ? "" : mini ? styles.showFlex : styles.hide}`}>
    <a className={styles.logoLink} href="https://github.com/wswmsword/hanav">Hanav Repo</a>
    <div className={styles.right}>
      {lowerCaseLng === "en" ?
        <Link href="/zh-cn" className={styles.lang_switch} lang="zh-CN">简体中文</Link> :
        <Link href="/en" className={styles.lang_switch} lang="en">English</Link>}
      <MiniToggle className={styles.toggle}>
        {opened => <span className={`${styles.toggleIcon} ${opened ? styles.opened : ""}`}></span>}
      </MiniToggle>
    </div>
    <MiniMenu className={styles.miniMenu}>
      <MiniTrigger className={styles.miniTriggerWrapper}>
        <MiniItem><button className={styles.miniTrigger}>Hanav</button></MiniItem>
        <MiniItem><button>Postcss-Mobile-Forever</button></MiniItem>
        <MiniItem><button>Focus-Fly</button></MiniItem>
      </MiniTrigger>
      <MiniContent className={styles.miniContent}>
        <MiniItem><NavbarSlate t={t} /></MiniItem>
        <MiniItem><MobileForeverSlate t={t} /></MiniItem>
        <MiniItem><FocusFlySlate t={t} /></MiniItem>
      </MiniContent>
    </MiniMenu>
  </MiniNavBar>
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
  </CenterBox></>;
}