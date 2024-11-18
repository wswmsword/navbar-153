import React, { useEffect, useMemo, useRef, useState } from "react";
import { ContextForMiniMenu, ContextForMiniItem, ContextForMiniContent, ContextForMiniToggle, ContextForMiniTrigger } from "./context";

export default function NavBar({ children, ...navProps }) {

  const navRef = useRef(null);
  const [expanded, setE] = useState(); // 是否展开
  const [openedMenuIdx, setIdx] = useState(-1); // 当前打开 trigger 的序号
  const prevIdx = useRef(-1);
  /** 菜单按钮的元素们 */
  const btnsRef = useRef([]);
  /** 每个内容面板的头元素 */
  const headFocusItemInContent = useRef([]);
  /** 每个内容面板的尾元素 */
  const tailFocusItemInContent = useRef([]);


  useEffect(() => {
    if (expanded) {
      if (openedMenuIdx < 0) {
        btnsRef.current[prevIdx.current].focus();
      } else {
        headFocusItemInContent.current[openedMenuIdx]?.focus?.();
      }
    }
  }, [openedMenuIdx]);


  const { style, ..._navProps } = navProps;

  const menuContextVal = useMemo(() => ({
    navRef,
    expanded,
    setE,
    btnsRef,
    openedMenuIdx,
    tailFocusItemInContent,
    headFocusItemInContent,
  }), [expanded, openedMenuIdx]);

  const itemContextVal = useMemo(() => ({
    openedMenuIdx,
    openOrCloseContentById,
    btnsRef,
    headFocusItemInContent,
    tailFocusItemInContent,
  }), [openedMenuIdx]);

  const contentContextVal = useMemo(() => ({
    openedMenuIdx,
  }), [openedMenuIdx]);

  const toggleContextVal = useMemo(() => ({
    setE,
    expanded,
    openOrCloseContentById,
    btnsRef,
  }), [expanded]);

  const triggerContextVal = useMemo(() => ({
    openedMenuIdx,
  }), [openedMenuIdx]);

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

  function openOrCloseContentById(idx) {
    setIdx(prev => {
      prevIdx.current = prev;
      return idx;
    });
  }
}