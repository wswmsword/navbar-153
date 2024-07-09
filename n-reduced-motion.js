import React, { createContext, useRef, useState, useCallback, useMemo } from "react";
import { Context, ContextForTrigger } from "./index";
import { useEntryExitFocus } from "./useHooks";

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

  const triggerWrapperRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, false);

  const setActivePanel = useCallback(cur => {
    checkedFocusOwnerContent.current = false;
    setIdx(v => {
      if (cur !== v) prevMenuIdxRef.current = v;
      return cur;
    });
  }, []);

  /** 菜单面板上的键盘操作 */
  const escapeMenu = idx => e => {
    if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
      // 关闭菜单
      isKeyActive.current = true;
      setActivePanel(-1);
      return;
    }

    if (e.key === "Tab" || e.keyCode === 9) {
      // 非键盘模式下切换菜单之后，按下 tab
      if (!checkedFocusOwnerContent.current && prevMenuIdxRef.current > -1 && onlyKeyFocus && !isKeyActive.current) {
        const activeE = document.activeElement;
        if (contentWrapperRef.current?.contains(activeE)) { // 焦点在所有面板的 wrapper 中
          const focusTarget = panelsRef.current[openedMenuIdx]; // 当前面板
          if (!focusTarget.contains(activeE)) { // 焦点不在当前面板
            checkedFocusOwnerContent.current = true;
            focusTarget.focus({ preventScroll: true });
            e.preventDefault();
            return;
          }
        }
      }
    }

    const head = headFocusItemInContent.current[idx];
    const tail = tailFocusItemInContent.current[idx];
    // 焦点矫正
    if (e.target === panelsRef.current[idx]) {
      if (e.key === "Tab" || e.keyCode === 9) {
        if (e.shiftKey) {
          tail && tail.focus();
        } else {
          head && head.focus();
        }
        e.preventDefault();
      }
    }

    // 回尾
    if (e.target === head && (e.key === "Tab" || e.keyCode === 9) && e.shiftKey) {
      tail && tail.focus();
      e.preventDefault();
    }

    // 回头
    if (e.target === tail && (e.key === "Tab" || e.keyCode === 9) && !e.shiftKey) {
      head && head.focus();
      e.preventDefault();
    }
  };

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
    leaveMenuPanel: leaveMenu,
    triggerWrapperRef,
    contentWrapperRef,
    gap,
    openedMenuIdx,
    dynamicWidth,
    panelsRef,
    close,
    btnsRef,
  }), [leaveMenu, gap, openedMenuIdx, dynamicWidth, close]);

  return <Context.Provider value={{
    escapeMenu,
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