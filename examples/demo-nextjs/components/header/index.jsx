"use client"

import styles from "./index.module.css";
import N from "navbar-153";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate"
import { useEffect, useState } from "react";
import CenterBox from "../center-box";
import { useTranslation } from "@/i18n/client";
import { Trans } from "react-i18next";

const { Trigger, Item, Content } = N;

export default function Header({ lng }) {
  
  const [motion, setMotion] = useState(true);
  const [dynamicWidth, setD] = useState(false);
  const [close, setClose] = useState(false);
  const [onlyKeyFocus, setOnly] = useState(true);
  const [customTrans, setCT] = useState(false);

  const { t } = useTranslation(lng);

  // 检测操作系统是否打开了“减弱动态效果”
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
    handleReducedMotionChange(mediaQueryList);
    mediaQueryList.addListener(handleReducedMotionChange);

    return () => {
      mediaQueryList.removeListener(handleReducedMotionChange);
    }

    function handleReducedMotionChange(mql) {
      setMotion(!mql.matches);
    }
  }, []);

  return <><div className={styles.header}> 
    <N className={styles.nav} gap="16" onlyKeyFocus={onlyKeyFocus} dur={.4} motion={motion} dynamicWidth={dynamicWidth} close={close}>
      <Trigger className={styles.triggerWrapper}>
        <Item><a href="https://github.com/wswmsword/navbar-153" className={styles.navLink}>Repo</a></Item>
        <Item>{props => <button className={styles.navBtn} {...props}>Navbar-153</button>}</Item>
        <Item>{props => <button className={styles.navBtn} {...props}><span className={styles.onlyDesktop}>Postcss-</span>Mobile-Forever</button>}</Item>
        <Item>{props => <button className={styles.navBtn} {...props}>Focus-Fly</button>}</Item>
      </Trigger>
      <Content className={styles.panelsWrapper} inner={{ className: styles.panelsWrapperInner }} customTransProps={customTrans ? { opacity: [0, 1], transform: ["translate(0)", "translateX(-280px)", "translateX(280px)"] } : null}>
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
      </Content>
    </N>
  </div><div className={styles.placeholder} />
  <CenterBox className={styles.form}>
    <div className={styles.motionWrapper}>
      <label className={styles.formItem} title={t("tooltip")}><input type="checkbox" checked={motion} onChange={() => setMotion(v => !v)} /> motion</label>
      <span className={styles.tooltip} role="presentation"><Trans i18nKey="tooltip2" t={t}>0<a className={styles.tLink} href="https://stackoverflow.com/a/59709067">1</a>2</Trans></span>
    </div>
    <label className={styles.formItem}><input type="checkbox" checked={dynamicWidth} onChange={() => setD(v => !v)} /> dynamicWidth</label>
    <label className={styles.formItem}><input type="checkbox" checked={close} onChange={() => setClose(v => !v)} /> close</label>
    <label className={styles.formItem}><input type="checkbox" checked={onlyKeyFocus} onChange={() => setOnly(v => !v)} /> onlyKeyFocus</label>
    <label className={styles.formItem}><input type="checkbox" checked={customTrans} onChange={() => setCT(v => !v)} /> customTransProps</label>
  </CenterBox></>;
}