import React, { createContext, useRef, useState, useCallback, useMemo } from "react";
import { Context, ContextForTrigger } from "./index";

export const ContextForContent = createContext({});

export default function NReducedMotion({ children, gap = 0, dynamicWidth = false, onlyKeyFocus = true, close = false, ...navProps }) {
  /** 保存 trigger 的 aria-id */
  const triggerAriaIds = useRef([]);
  /** 保存 content 的 aria-id */
  const contentAriaIds = useRef([]);

  const [openedMenuIdx, setIdx] = useState(-1); // 当前菜单序号
  /** 上一个菜单序号 */
  const prevMenuIdxRef = useRef(-1);
  /** 菜单按钮的元素们 */
  const btnsRef = useRef([]);
  /** 面板的元素们 */
  const panelsRef = useRef([]);
  /** 当前操作是键盘操作吗，如果是键盘操作，就进行焦点转移 */
  const isKeyActive = useRef(false);
  /** 是否已经检查了焦点在切换面板之前在当前的面板中，用于性能优化 */
  const checkedFocusOwnerContent = useRef(false);

  const headFocusItemInContent = useRef([]);
  const tailFocusItemInContent = useRef([]);

  const contentWrapperRef = useRef(null);

  const setActivePanel = useCallback(cur => {
    checkedFocusOwnerContent.current = false;
    setIdx(v => {
      if (cur !== v) prevMenuIdxRef.current = v;
      return cur;
    });
  }, []);

  /** 进入一个菜单按钮 */
  const overMenu = (e) => {
    const target = e.target;
    const targetIdx = btnsRef.current.findIndex(e => e === target);
    if (targetIdx > -1 && targetIdx !== openedMenuIdx) {
      isKeyActive.current = false;
      setActivePanel(targetIdx);
    }
  };

  /** 离开一个菜单按钮 */
  const leaveMenu = useCallback(() => {
    isKeyActive.current = false;
    setActivePanel(-1);
  }, []);

  const triggerContextVal = useMemo(() => ({
    openedMenuIdx,
    headFocusItemInContent,
    panelsRef,
  }), [openedMenuIdx]);

  const contentContextVal = useMemo(() => ({
    openedMenuIdx,
    // overMenuPanel
    leaveMenuPanel: leaveMenu,
    // dur
    contentWrapperRef,
    onlyKeyFocus,
    prevMenuIdxRef,
    isKeyActive,
    btnsRef,
    panelsRef,
    headFocusItemInContent,
    close,
    gap,
    dynamicWidth,
  }), [leaveMenu, gap, openedMenuIdx, dynamicWidth, close, onlyKeyFocus]);

  return <Context.Provider value={{
    panelsRef,
    btnsRef,
    overMenu,
    leaveMenu,
    openedMenuIdx,
    triggerAriaIds,
    contentAriaIds,
    headFocusItemInContent,
    tailFocusItemInContent,
    isKeyActive,
    setActivePanel,
    checkedFocusOwnerContent,
    prevMenuIdxRef,
    onlyKeyFocus,
    contentWrapperRef
  }}>
    <ContextForTrigger.Provider value={triggerContextVal}>
      <ContextForContent.Provider value={contentContextVal}>
        <nav aria-label="Main" {...navProps}>
          {children}
        </nav>
      </ContextForContent.Provider>
    </ContextForTrigger.Provider>
  </Context.Provider>;
}