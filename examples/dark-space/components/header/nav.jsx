import styles from "./index.module.css";
import { NavBar, Trigger, Content, Item, CustomXMotionContent, CustomYMotionContent,
  CustomMotionContent, ReducedMotionContent } from "hanav";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate"

/** 宽屏状态下的导航栏，如桌面端 */
export default function Nav({ mini, small, onlyKeyFocus, dynamicWidth, close, t, motion, hasCustomXTrans, hasCustomYTrans }) {

  const FinalC = (() => {
    if (!motion) return ReducedMotionContent;
    if (hasCustomXTrans && hasCustomYTrans) return CustomMotionContent;
    if (hasCustomXTrans) return CustomXMotionContent;
    if (hasCustomYTrans) return CustomYMotionContent;
    return Content;
  })();

  return <div className={`${styles.header} ${mini == null ? "" : mini ? styles.hide : styles.show}`}> 
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
  </div>;
}