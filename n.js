import React, { createContext, useState, useRef, useEffect, useCallback, useMemo, useLayoutEffect } from "react";
import { Context, ContextForTrigger } from "./index";
import { useEntryExitFocus } from "./useHooks";

export const ContextForContent = createContext({});

export default function N({ children, dur = 0.5, gap = 0, dynamicWidth = false, onlyKeyFocus = true, close = false, ...navProps }) {
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
  /** 面板的元素们的高度，完成过渡动画 */
  const panelsHeightRef = useRef([]);
  /** 面板元素们的宽度，完成过渡动画 */
  const panelsWidthRef = useRef([]);
  /** 面板们的左边偏移量 */
  const panelsOffsetLeftRef = useRef([]);
  /** 面板们的宽度 */
  const panelsClientWidthRef = useRef([]);
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
  /** 是否已经检查了焦点在切换面板之前在当前的面板中，用于性能优化 */
  const checkedFocusOwnerContent = useRef(false);

  if (panelsHeightRef.current.length > 0) {
    const prevActiveH = panelsHeightRef.current[prevMenuIdxRef.current];
    const curActiveH = panelsHeightRef.current[openedMenuIdx];
    isPanelGetHigherRef.current = (curActiveH || 0) > (prevActiveH || 0);
  }

  const setActivePanel = useCallback(cur => {
    transRunning.current = true;
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

  const [destroyContent, setDestroy] = useState(false);

  // 缓存元素们的尺寸
  useLayoutEffect(() => {
    panelsHeightRef.current = panelsRef.current.map(e => e?.scrollHeight || 0);
    panelsWidthRef.current = panelsRef.current.map(e => e?.scrollWidth || 0);
    panelsOffsetLeftRef.current = panelsRef.current.map(e => e?.offsetLeft || 0);
    panelsClientWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
    setDestroy(true);
  }, []);

  const [transitionEnded, setEnded] = useState(true); // 收起的过渡动画结束了吗

  useEffect(() => {
    if (openedMenuIdx > -1) {
      setDestroy(false);
    }
  }, [openedMenuIdx]);

  useEffect(() => {
    // 面板动画开始
    if (openedMenuIdx > -1 && prevMenuIdxRef.current < 0 && transitionEnded) {
      setTimeout(() => {
        setEnded(false);
      }, 18);
    }
  }, [openedMenuIdx, transitionEnded]);

  const transitionEnd = useCallback(e => {
    const contentWrapper = contentWrapperRef.current;
    if (e.target !== contentWrapper) return; // 过滤冒泡的 transitionend 事件
    transRunning.current = false;
    if (openedMenuIdx < 0) {
      setEnded(true);
      setDestroy(true);
    }
  }, [openedMenuIdx]);

  const nextContentInnerTransformVal = (() => {

    const collapseOrTEnded = (transitionEnded || isCollapse);
    if (close) {
      return collapseOrTEnded ?
        getSlateWrapperTranslateVal(
          "-100%",
          openedMenuIdx < 0 ? prevMenuIdxRef.current : openedMenuIdx,
          btnsRef,
          panelsClientWidthRef) :
        getSlateWrapperTranslateVal(`${gap}px`, openedMenuIdx, btnsRef, panelsClientWidthRef);

    } else {
      return collapseOrTEnded ?
        `translateY(-100%)`: // 入场的初始状态（退场结束）
        `translateY(${gap}px)`; // 入场的结束状态（退场初始）
    }
  })();

  const nextContentItemTransformVal = openedMenuIdx < 0 ?
    getSlateTranslateVal(prevMenuIdxRef.current, panelsOffsetLeftRef) :
    getSlateTranslateVal(openedMenuIdx, panelsOffsetLeftRef)

  const headFocusItemInContent = useRef([]);
  const tailFocusItemInContent = useRef([]);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, destroyContent);

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

  const triggerContextVal = useMemo(() => ({
    triggerWrapperRef,
    openedMenuIdx,
    headFocusItemInContent,
    panelsRef,
  }), [openedMenuIdx]);

  return <Context.Provider value={{
    panelsRef,
    btnsRef,
    nextContentItemTransformVal,
    transitionEnded,
    overMenu,
    leaveMenu,
    openedMenuIdx,
    triggerAriaIds,
    contentAriaIds,
    headFocusItemInContent,
    tailFocusItemInContent,
    dur,
    isKeyActive,
    setActivePanel,
    checkedFocusOwnerContent,
    prevMenuIdxRef,
    onlyKeyFocus,
    contentWrapperRef,
    transRunning
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

function getSlateTranslateVal(i, panelsOffsetLeftRef) {
  const left = i < 1 ? 0 : `-${panelsOffsetLeftRef.current[i]}px`;
  return `translateX(${left})`;
}

function getSlateWrapperTranslateVal(y, openedMenuIdx, triggerRef, slateClientWidthRef) {
  const curSlateWidth = slateClientWidthRef.current[openedMenuIdx];
  const curTrigger = triggerRef.current[openedMenuIdx];
  const left = (curSlateWidth == null || curTrigger == null) ?
    0 :
    (curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlateWidth / 2);
  return `translate(${left}px, ${y})`;
}