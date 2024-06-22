"use client"

import styles from "./index.module.css";
import N from "navbar-153";
import NavbarSlate from "../navbar-slate";
import MobileForeverSlate from "../mobile-forever-slate";
import FocusFlySlate from "../focus-fly-slate"

const { Trigger, Item, Content } = N;

export default function Header() {
  return <><div className={styles.header}> 
    <N className={styles.nav} gap="16" onlyKeyFocus={true}>
      <Trigger className={styles.triggerWrapper}>
        <Item><a href="https://github.com/wswmsword/navbar-153" className={styles.navLink}>Repo</a></Item>
        <Item>{props => <button className={styles.navBtn} {...props}>Navbar-153</button>}</Item>
        <Item>{props => <button className={styles.navBtn} {...props}>Postcss-Mobile-Forever</button>}</Item>
        <Item>{props => <button className={styles.navBtn} {...props}>Focus-Fly</button>}</Item>
      </Trigger>
      <Content className={styles.panelsWrapper} inner={{ className: styles.panelsWrapperInner }}>
        <Item>
          {(props, head, tail) =>
            <NavbarSlate
              propsFromN={props}
              head={head}
              tail={tail} />}
        </Item>
        <Item>
          {(props, head, tail) =>
            <MobileForeverSlate
              propsFromN={props}
              head={head}
              tail={tail} />}
        </Item>
        <Item>
        {(props, head, tail) =>
          <FocusFlySlate
            propsFromN={props}
            head={head}
            tail={tail} />}
        </Item>
      </Content>
    </N>
  </div><div className={styles.placeholder} /></>;
}