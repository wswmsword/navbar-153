import React, { createContext, useState, useRef, useCallback, useMemo } from "react";
import Item from "./n-item";
import Content from "./n-content";
import Trigger from "./n-trigger";

export const ContextForItem = createContext({});
export const ContextForTrigger = createContext();
export const ContextForContent = createContext({});

NavBar.Item = Item;
NavBar.Content = Content;
NavBar.Trigger = Trigger;

export default function NavBar({ children, dur = 0.5, gap = 0, dynamicWidth = false, onlyKeyFocus = true, close = false, motion = true, ...navProps }) {

  const [openedMenuIdx, setIdx] = useState(-1); // 当前菜单序号
  /** 上一个菜单序号 */
  const prevMenuIdxRef = useRef(-1);
  /** 菜单按钮的元素们 */
  const btnsRef = useRef([]);
  /** 面板的元素们 */
  const panelsRef = useRef([]);
  /** 如果不想离开，则清空这个 timer */
  const leaveTimerRef = useRef();
  /** 当前操作是键盘操作吗，如果是键盘操作，就进行焦点转移 */
  const isKeyActive = useRef(false);
  /** 是否已经检查了焦点在切换面板之前在当前的面板中，用于性能优化 */
  const checkedFocusOwnerContent = useRef(false);

  const headFocusItemInContent = useRef([]);
  const tailFocusItemInContent = useRef([]);

  const contentWrapperRef = useRef(null);

  /** 保存 trigger 的 aria-id */
  const triggerAriaIds = useRef([]);
  /** 保存 content 的 aria-id */
  const contentAriaIds = useRef([]);

  const setActivePanel = useCallback(cur => {
    checkedFocusOwnerContent.current = false;
    setIdx(v => {
      if (cur !== v) prevMenuIdxRef.current = v;
      return cur;
    });
  }, []);

  /** 进入菜单面板 */
  const overMenuPanel = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  /** 进入一个菜单按钮 */
  const overMenu = useCallback((e) => {
    overMenuPanel();
    const target = e.target;
    const targetIdx = btnsRef.current.findIndex(e => e === target);
    if (targetIdx > -1 && targetIdx !== openedMenuIdx) {
      isKeyActive.current = false;
      setActivePanel(targetIdx);
    }
  }, [openedMenuIdx]);

  /** 离开一个菜单按钮 */
  const leaveMenu = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    leaveTimerRef.current = setTimeout(() => {
      isKeyActive.current = false;
      setActivePanel(-1);
      leaveTimerRef.current = null;
    }, 600);
  }, []);

  /** 离开菜单面板 */
  const leaveMenuPanel = leaveMenu;

  const triggerContextVal = useMemo(() => ({
    openedMenuIdx,
    headFocusItemInContent,
    panelsRef,
  }), [openedMenuIdx]);

  const contentContextVal = useMemo(() => ({
    openedMenuIdx,
    overMenuPanel,
    leaveMenuPanel,
    dur,
    close,
    gap,
    dynamicWidth,
    onlyKeyFocus,
    motion,
    contentWrapperRef,
    prevMenuIdxRef,
    isKeyActive,
    btnsRef,
    panelsRef,
    headFocusItemInContent,
  }), [openedMenuIdx, gap, dur, onlyKeyFocus, close, dynamicWidth, motion]);

  const itemContextVal = useMemo(() => ({
    openedMenuIdx,
    overMenu,
    leaveMenu,
    dur,
    onlyKeyFocus,
    setActivePanel,
    checkedFocusOwnerContent,
    isKeyActive,
    headFocusItemInContent,
    tailFocusItemInContent,
    prevMenuIdxRef,
    contentWrapperRef,
    panelsRef,
    btnsRef,
    triggerAriaIds,
    contentAriaIds,
    prevMenuIdxRef,
  }), [openedMenuIdx, dur, onlyKeyFocus]);

  return <ContextForItem.Provider value={itemContextVal}>
    <ContextForContent.Provider value={contentContextVal}>
      <ContextForTrigger.Provider value={triggerContextVal}>
        <nav aria-label="Main" {...navProps}>
          {children}
        </nav>
      </ContextForTrigger.Provider>
    </ContextForContent.Provider>
  </ContextForItem.Provider>
}