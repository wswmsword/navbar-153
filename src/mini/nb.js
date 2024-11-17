import React, { useMemo, useRef, useState } from "react";
import { ContextForMiniMenu, ContextForMiniItem, ContextForMiniContent, ContextForMiniToggle } from "./context";

export default function NavBar({ children, ...navProps }) {

  const navRef = useRef(null);
  const [expanded, setE] = useState(false); // 是否展开
  const [openedMenuIdx, setIdx] = useState(-1); // 当前打开 trigger 的序号

  const { style, ..._navProps } = navProps;

  const menuContextVal = useMemo(() => ({
    navRef,
    expanded,
  }), [expanded]);

  const itemContextVal = useMemo(() => ({
    openedMenuIdx,
    setIdx,
  }), [openedMenuIdx]);

  const contentContextVal = useMemo(() => ({
    openedMenuIdx,
  }), [openedMenuIdx]);

  const toggleContextVa = useMemo(() => ({
    setE,
    expanded,
    setIdx,
  }), [expanded]);

  return <ContextForMiniMenu.Provider value={menuContextVal}>
    <ContextForMiniItem.Provider value={itemContextVal}>
      <ContextForMiniContent.Provider value={contentContextVal}>
        <ContextForMiniToggle.Provider value={toggleContextVa}>
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
        </ContextForMiniToggle.Provider>
      </ContextForMiniContent.Provider>
    </ContextForMiniItem.Provider>
  </ContextForMiniMenu.Provider>;
}