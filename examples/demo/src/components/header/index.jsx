import styles from "./index.module.css";
import N from "navbar-153";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate";
import CenterBox from "../center-box";
import { useState } from "react";

const { Trigger, Item, Content } = N;

export default function Header() {

  const [motion, setMotion] = useState(true);
  const [dynamicWidth, setD] = useState(false);
  const [close, setClose] = useState(false);
  const [onlyKeyFocus, setOnly] = useState(true);

  return <>
    <div className={styles.header}> 
      <N className={styles.nav} gap="16" onlyKeyFocus={onlyKeyFocus} dur={.4} motion={motion} dynamicWidth={dynamicWidth} close={close}>
        <Trigger className={styles.triggerWrapper}>
          <Item><a href="https://github.com/wswmsword/navbar-153" className={styles.navLink}>Repo</a></Item>
          <Item>{props => <button className={styles.navBtn} {...props}>Navbar-153</button>}</Item>
          <Item>{props => <button className={styles.navBtn} {...props}>Postcss-Mobile-Forever</button>}</Item>
          <Item>{props => <button className={styles.navBtn} {...props}>Focus-Fly</button>}</Item>
        </Trigger>
        <Content className={styles.panelsWrapper} inner={{ className: styles.panelsWrapperInner }} customTransProps={{ opacity: [0, 1], transform: ["translate(0)", "translateX(-280px)", "translateX(280px)"] }}>
          <Item>
            {(props, head, tail) =>
              <NavbarSlate
                dynamicWidth={dynamicWidth}
                propsFromN={props}
                head={head}
                tail={tail} />}
          </Item>
          <Item>
            {(props, head, tail) =>
              <MobileForeverSlate
                dynamicWidth={dynamicWidth}
                propsFromN={props}
                head={head}
                tail={tail} />}
          </Item>
          <Item>
          {(props, head, tail) =>
            <FocusFlySlate
              dynamicWidth={dynamicWidth}
              propsFromN={props}
              head={head}
              tail={tail} />}
          </Item>
        </Content>
      </N>
    </div>
    <div className={styles.placeholder} />
    <CenterBox className={styles.form}>
      <label className={styles.formItem}><input type="checkbox" checked={motion} onChange={() => setMotion(v => !v)} /> motion</label>
      <label className={styles.formItem}><input type="checkbox" checked={dynamicWidth} onChange={() => setD(v => !v)} /> dynamicWidth</label>
      <label className={styles.formItem}><input type="checkbox" checked={close} onChange={() => setClose(v => !v)} /> close</label>
      <label className={styles.formItem}><input type="checkbox" checked={onlyKeyFocus} onChange={() => setOnly(v => !v)} /> onlyKeyFocus</label>
    </CenterBox>
  </>;
}