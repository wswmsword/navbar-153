import React, { createContext, useState, useRef, useEffect, useCallback, useMemo, useLayoutEffect } from "react";
import Item from "./n-item";
import Content from "./n-content";
import Trigger from "./n-trigger";

export const Context = createContext({});
export const ContextForContent = createContext({});
export const ContextForTrigger = createContext();

NavBar.Item = Item;
NavBar.Content = Content;
NavBar.Trigger = Trigger;

export default function NavBar({ children, dur = 0.5, gap = 0, dynamicWidth = false, onlyKeyFocus = true, ...navProps }) {

  /** 保存 trigger 的 aria-id */
  const triggerAriaIds = useRef([]);
  /** 保存 content 的 aria-id */
  const contentAriaIds = useRef([]);

  const [openedMenuIdx, setIdx] = useState(-1); // 当前菜单序号
  /** 上一个菜单序号 */
  const prevMenuIdxRef = useRef(-1);
  /** 是否为收起菜单操作 */
  const isCollapse = openedMenuIdx < 0 && prevMenuIdxRef.current > -1;

  /** 菜单按钮的元素们 */
  const btnsRef = useRef([]);
  /** 面板的元素们的高度，完成过渡动画  */
  const panelsHeightRef = useRef([]);
  /** 面板元素们的宽度，完成过渡动画 */
  const panelsWidthRef = useRef([]);
  /** 面板们的左边偏移量 */
  const panelsOffsetLeftRef = useRef([]);
  /** 面板的元素们 */
  const panelsRef = useRef([]);
  /** 如果不想离开，则清空这个 timer */
  const leaveTimerRef = useRef();
  /** 是否变高 */
  const isPanelGetHigherRef = useRef(false);
  /** 当前操作是键盘操作吗，如果是键盘操作，就进行焦点转移 */
  const isKeyActive = useRef(false);
  /** 动画正在进行吗，正在进行则不允许 tab 聚焦 */
  const transRunning = useRef(false);

  if (panelsHeightRef.current.length > 0) {
    const prevActiveH = panelsHeightRef.current[prevMenuIdxRef.current];
    const curActiveH = panelsHeightRef.current[openedMenuIdx];
    isPanelGetHigherRef.current = (curActiveH || 0) > (prevActiveH || 0);
  }

  const setActivePanel = useCallback(cur => {
    transRunning.current = true;
    setIdx(v => {
      prevMenuIdxRef.current = v;
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
  const overMenu = (e) => {
    overMenuPanel();
    const target = e.target;
    const targetIdx = btnsRef.current.findIndex(e => e === target);
    if (targetIdx > -1 && targetIdx !== openedMenuIdx) {
      isKeyActive.current = false;
      setActivePanel(targetIdx);
    }
  };

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

  /** 点击菜单按钮 */
  const clickMenuBtn = e => {
    const target = e.target;
    const targetIdx = btnsRef.current.findIndex(e => e === target);
    if (targetIdx > -1) {
      isKeyActive.current = e.screenX === 0 && e.screenY === 0;
      if (targetIdx === openedMenuIdx) {
        // 关闭菜单
        setActivePanel(-1);
      } else {
        // 打开菜单
        setActivePanel(targetIdx);
      }
    }
  };

  /** 按下 Esc 退出菜单 */
  const escapeMenu = idx => e => {
    if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
      // 关闭菜单
      isKeyActive.current = true;
      setActivePanel(-1);
    }

    // 动画进行时期，禁止 tab，避免聚焦引起的样式错位
    if ((e.key === "Tab" || e.keyCode === 9) && transRunning.current) {
      e.preventDefault();
      return false;
    }

    const head = headFocusItemInContent.current[idx]
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

  const [destroyContent, setDestroy] = useState(false);

  // 缓存元素们的高度
  useLayoutEffect(() => {
    panelsHeightRef.current = panelsRef.current.map(e => e?.scrollHeight || 0);
    panelsWidthRef.current = panelsRef.current.map(e => e?.scrollWidth || 0);
    panelsOffsetLeftRef.current = panelsRef.current.map(e => e?.offsetLeft || 0);
    setDestroy(true);
  }, []);

  const [xStartIdx, setStartI] = useState(-1); // 过渡动画起点按钮编号
  const [xEndIdx, setEndI] = useState(-1); // 过渡动画结束按钮编号

  const [transitionEnded, setEnded] = useState(true); // 收起的过渡动画结束了吗

  useEffect(() => {
    if (openedMenuIdx > -1) {
      setDestroy(false);
    }
  }, [openedMenuIdx]);

  useEffect(() => {
    // 面板动画开始
    if (openedMenuIdx > -1 && prevMenuIdxRef.current < 0 && transitionEnded) {
      setStartI(openedMenuIdx);
      setTimeout(() => {
        setEnded(false);
      }, 18);
    }
    if (openedMenuIdx > -1) setEndI(openedMenuIdx);
  }, [openedMenuIdx, transitionEnded]);

  const transitionEnd = useCallback(() => {
    transRunning.current = false;
    setStartI(openedMenuIdx);
    if (openedMenuIdx < 0) {
      setEnded(true);
      setDestroy(true);
    }
  }, [openedMenuIdx, dur, onlyKeyFocus]);

  const nextContentInnerTransformVal = (transitionEnded || isCollapse) ?
    `translateY(-100%)` : // 入场的初始状态（退场结束）
    `translateY(${gap}px)`; // 入场的结束状态（退场初始）

  const nextContentItemTransformVal = transitionEnded ?
    `translateX(${getTranslateXVal(xStartIdx, panelsOffsetLeftRef)})` :
    `translateX(${getTranslateXVal(xEndIdx, panelsOffsetLeftRef)})`;

  const headFocusItemInContent = useRef([]);
  const tailFocusItemInContent = useRef([]);

  // 离开的焦点控制
  useEffect(() => {
    if (openedMenuIdx < 0) {
      if (prevMenuIdxRef.current > -1) {
        if ((onlyKeyFocus && isKeyActive.current) || !onlyKeyFocus)
          btnsRef.current[prevMenuIdxRef.current].focus();
      }
    }
  }, [openedMenuIdx, onlyKeyFocus]);

  // 进入的焦点控制
  useEffect(() => {
    if (openedMenuIdx > -1) {
      if (!destroyContent && ((onlyKeyFocus && isKeyActive.current) || !onlyKeyFocus)) {
        const head = headFocusItemInContent.current[openedMenuIdx];
        if (head) head.focus({ preventScroll: true });
        else panelsRef.current[openedMenuIdx].focus({ preventScroll: true });
      }
    }
  }, [openedMenuIdx, onlyKeyFocus, destroyContent])

  const triggerWrapperRef = useRef(null);
  const contentWrapperRef = useRef(null);

  const contentContextVal = useMemo(() => ({
    overMenuPanel,
    leaveMenuPanel,
    transitionEnd,
    innerHeight: isCollapse ? panelsHeightRef.current[prevMenuIdxRef.current] : panelsHeightRef.current[openedMenuIdx],
    gapHeight: + gap + panelsHeightRef.current[openedMenuIdx] || 0,
    width: !dynamicWidth ?
      null :
      openedMenuIdx === -1 ?
        (panelsWidthRef.current[prevMenuIdxRef.current] || 0) :
        (panelsWidthRef.current[openedMenuIdx] || 0),
    transitionEnded,
    dur,
    triggerWrapperRef,
    contentWrapperRef,
    nextContentInnerTransformVal,
    destroyContent,
  }), [openedMenuIdx, gap, transitionEnded, dur, isCollapse, destroyContent]);

  const triggerContextVal = useMemo(() => triggerWrapperRef, []);

  return <Context.Provider value={{
    escapeMenu,
    panelsRef,
    btnsRef,
    nextContentItemTransformVal,
    transitionEnded,
    clickMenuBtn,
    overMenu,
    leaveMenu,
    openedMenuIdx,
    triggerAriaIds,
    contentAriaIds,
    headFocusItemInContent,
    tailFocusItemInContent,
    dur,
  }}>
    <ContextForContent.Provider value={contentContextVal}>
      <ContextForTrigger.Provider value={triggerContextVal}>
        <nav aria-label="Main" {...navProps}>
          {children}
        </nav>
      </ContextForTrigger.Provider>
    </ContextForContent.Provider>
  </Context.Provider>;
}

function getTranslateXVal(i, panelsOffsetLeftRef) {
  return i < 1 ? 0 : `-${panelsOffsetLeftRef.current[i]}px`;
}