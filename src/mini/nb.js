import React, { useMemo, useRef, useState } from "react";
import { ContextForMiniMenu, ContextForMiniItem, ContextForMiniContent, ContextForMiniToggle, ContextForMiniTrigger } from "./context";

export default function NavBar({ children, ...navProps }) {

  const navRef = useRef(null);
  const [expanded, setE] = useState(); // 是否展开
  const [openedMenuIdx, setIdx] = useState(-1); // 当前打开 trigger 的序号
  /** 菜单按钮的元素们 */
  const btnsRef = useRef([]);
  /** 触发器数量 */
  const triggersCountRef = useRef(0);

  const { style, ..._navProps } = navProps;

  const menuContextVal = useMemo(() => ({
    navRef,
    expanded,
    setE,
    btnsRef,
  }), [expanded]);

  const itemContextVal = useMemo(() => ({
    openedMenuIdx,
    setIdx,
    btnsRef,
    triggersCountRef,
  }), [openedMenuIdx]);

  const contentContextVal = useMemo(() => ({
    openedMenuIdx,
  }), [openedMenuIdx]);

  const toggleContextVal = useMemo(() => ({
    setE,
    expanded,
    setIdx,
    btnsRef,
  }), [expanded]);

  const triggerContextVal = useMemo(() => ({
    triggersCountRef,
  }), []);

  return <ContextForMiniMenu.Provider value={menuContextVal}>
    <ContextForMiniItem.Provider value={itemContextVal}>
      <ContextForMiniContent.Provider value={contentContextVal}>
        <ContextForMiniToggle.Provider value={toggleContextVal}>
          <ContextForMiniTrigger.Provider value={triggerContextVal}>
            <nav
              aria-label="Main"
              ref={navRef}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 2,
                ...style,
              }}
              {..._navProps}>
              {children}
            </nav>
          </ContextForMiniTrigger.Provider>
        </ContextForMiniToggle.Provider>
      </ContextForMiniContent.Provider>
    </ContextForMiniItem.Provider>
  </ContextForMiniMenu.Provider>;
}