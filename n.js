import React, { useState, useRef, useCallback, useMemo } from "react";
import { ContextForItem, ContextForContent, ContextForTrigger } from "./context";

export default function NavBar({ children, dur = 0.5, gap = 0, dynamicWidth = false, onlyKeyFocus = true, close = false, motion = true, ...navProps }) {

  const [openedMenuIdx, setIdx] = useState(-1); // 当前菜单序号
  /** 上一个菜单序号 */
  const prevMenuIdxRef = useRef(-1);
  /** 上一个菜单序号的上一个菜单序号，用于 `<CustomMotionContent>` 收回面板时切换菜单的动画 */
  const collapsePrevMenuIdx2Ref = useRef(-1);
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
    collapsePrevMenuIdx2Ref.current = -1; // 初始化
    setIdx(v => {
      if (cur !== v) {
        // 收起一半展开其它面板
        if (v < 0 && prevMenuIdxRef.current > -1 && cur > -1 && cur !== prevMenuIdxRef.current)
          collapsePrevMenuIdx2Ref.current = prevMenuIdxRef.current;
        prevMenuIdxRef.current = v;
      }
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
    collapsePrevMenuIdx2Ref,
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