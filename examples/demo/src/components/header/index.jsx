import styles from "./index.module.css";
import { NavBar, Trigger, Item, CustomXMotionContent, ReducedMotionContent } from "hanav";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate";
import CenterBox from "../center-box";
import { useState } from "react";
import { ContextF } from "../../main";
import { useContext, useMemo } from "react";

export default function Header() {
  const setG = useContext(ContextF);
  const [motion, setMotion] = useState(true);
  const [dynamicWidth, setD] = useState(false);
  const [close, setClose] = useState(false);
  const [onlyKeyFocus, setOnly] = useState(true);

  const FinalC = motion ? CustomXMotionContent : ReducedMotionContent;
  const xTrans = useMemo(() => motion ? {
    xTrans: { opacity: [0, 1], transform: ["translate(0)", "translateX(-280px)", "translateX(280px)"] }
  } : null, [motion]);

  const hoverA = () => setG(true);
  const leaveA = () => setG(false);

  return <>
    <div className={styles.header}> 
      <NavBar className={styles.nav} gap="16" onlyKeyFocus={onlyKeyFocus} dur={.4} motion={motion} dynamicWidth={dynamicWidth} close={close}>
        <Trigger className={styles.triggerWrapper}>
          <a href="https://github.com/wswmsword/hanav" className={styles.navLink} onMouseEnter={hoverA} onMouseLeave={leaveA} onFocus={hoverA} onBlur={leaveA}>Repo</a>
          <Item><button className={styles.navBtn}>HANAV</button></Item>
          <Item><button className={styles.navBtn}>Postcss-Mobile-Forever</button></Item>
          <Item><button className={styles.navBtn}>Focus-Fly</button></Item>
        </Trigger>
        <FinalC
          className={`${styles.panelsWrapperInner} ${styles.customYWrapper}`}
          yTrans={{
            opacity: [0, 1],
            transform: ["rotateX(-30deg) scale(.9)", "rotateX(0deg) scale(1)"],
          }}
          {...xTrans}>
          <Item><NavbarSlate dynamicWidth={dynamicWidth} /></Item>
          <Item><MobileForeverSlate dynamicWidth={dynamicWidth} /></Item>
          <Item><FocusFlySlate dynamicWidth={dynamicWidth} /></Item>
        </FinalC>
      </NavBar>
    </div>
    <div className={styles.placeholder} />
    <CenterBox className={styles.form}>
      <label className={styles.formItem}><input type="checkbox" checked={motion} onChange={() => setMotion(v => !v)} /> motion</label>
      <label className={styles.formItem}><input type="checkbox" checked={dynamicWidth} onChange={() => setD(v => !v)} /> dynamicWidth</label>
      <label className={styles.formItem}><input type="checkbox" checked={close} onChange={() => setClose(v => !v)} /> close</label>
      <label className={styles.formItem}><input type="checkbox" checked={onlyKeyFocus} onChange={() => setOnly(v => !v)} /> onlyKeyFocus</label>
    </CenterBox>
  </>;
};