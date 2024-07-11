import React, { Children, cloneElement, useContext, useLayoutEffect, useState, useEffect, useCallback, useRef, createContext } from "react";
import { ContextForContent } from "./index";
import { ContextMotion } from "./index";
import { useEntryExitFocus } from "./useHooks";

export const MotionContentContext = createContext();

export default function Content({ children, inner = {}, style, ...contentWrapperProps }) {
  const motion = useContext(ContextMotion);
  return motion ?
    <ContentWithMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentWithMotion> :
    <ContentReducedMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentReducedMotion>
}

Content.displayName = "Content";

function ContentWithMotion({ children, inner = {}, style, ...contentWrapperProps }) {
  const {
    openedMenuIdx,
    overMenuPanel,
    leaveMenuPanel,
    dur,
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
  } = useContext(ContextForContent);

  const [destroyContent, setDestroy] = useState(false);
  /** 面板们的宽度 */
  const panelsClientWidthRef = useRef([]);
  /** 面板们的左边偏移量 */
  const panelsOffsetLeftRef = useRef([]);
  /** 面板的元素们的高度，完成过渡动画 */
  const panelsHeightRef = useRef([]);
  /** 面板元素们的宽度，完成过渡动画 */
  const panelsWidthRef = useRef([]);
  const [transitionEnded, setEnded] = useState(true); // 收起的过渡动画结束了吗
  /** 动画正在进行吗，正在进行则不允许 tab 聚焦 */
  const transRunning = useRef(false);

  useEffect(() => {
    // 面板动画开始
    if (openedMenuIdx > -1 && prevMenuIdxRef.current < 0 && transitionEnded) {
      setTimeout(() => {
        setEnded(false);
      }, 18);
    }
  }, [openedMenuIdx, transitionEnded]);

  // 缓存的元素们的尺寸
  useLayoutEffect(() => {
    panelsClientWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
    panelsOffsetLeftRef.current = panelsRef.current.map(e => e?.offsetLeft || 0);
    panelsHeightRef.current = panelsRef.current.map(e => e?.scrollHeight || 0);
    panelsWidthRef.current = panelsRef.current.map(e => e?.scrollWidth || 0);
    setDestroy(true);
  }, []);

  useEffect(() => {
    transRunning.current = true;
    if (openedMenuIdx > -1) {
      setDestroy(false);
    }
  }, [openedMenuIdx]);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, destroyContent);

  const transitionEnd = useCallback(e => {
    const contentWrapper = contentWrapperRef.current;
    if (e.target !== contentWrapper) return; // 过滤冒泡的 transitionend 事件
    transRunning.current = false;
    if (openedMenuIdx < 0) {
      setEnded(true);
      setDestroy(true);
    }
  }, [openedMenuIdx]);

  if (destroyContent) return null;

  /** 是否为收起菜单操作 */
  const isCollapse = openedMenuIdx < 0 && prevMenuIdxRef.current > -1;
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

  const { style: innerStyle, ...otherInnerProps } = inner;
  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));
  const width = !dynamicWidth ?
    null :
    openedMenuIdx === -1 ?
      (panelsWidthRef.current[prevMenuIdxRef.current] || 0) :
      (panelsWidthRef.current[openedMenuIdx] || 0);

  return <MotionContentContext.Provider value={{
    transitionEnded,
    nextContentItemTransformVal,
    transRunning,
  }}><div
    ref={contentWrapperRef}
    style={{
      ...style,
      height: transitionEnded ? "0" : (+ gap + panelsHeightRef.current[openedMenuIdx] || 0),
      width,
      transition: `height ${dur}s, width ${dur}s`,
      clipPath: "inset(0 -100vw -100vw -100vw)"
    }}
    onTransitionEnd={transitionEnd}
    {...contentWrapperProps}>
    {/* 外层 div 用于 clipPath，内层 div 用于包裹实际内容，完成入场和退场的动画 */}
    <div
      onMouseOver={overMenuPanel}
      onMouseLeave={leaveMenuPanel}
      style={{
        ...innerStyle,
        display: "flex",
        alignItems: "flex-start",
        width,
        height: isCollapse ? panelsHeightRef.current[prevMenuIdxRef.current] : panelsHeightRef.current[openedMenuIdx],
        transition: `transform ${dur}s, height ${dur}s, width ${dur}s`,
        transform: nextContentInnerTransformVal,
        overflow: "hidden",
      }}
      {...otherInnerProps}>
      {mapped}
    </div>
  </div></MotionContentContext.Provider>;
}

function ContentReducedMotion({ children, inner = {}, style, ...contentWrapperProps }) {
  const { leaveMenuPanel, overMenuPanel, gap, contentWrapperRef, openedMenuIdx, dynamicWidth, panelsRef, close, btnsRef, onlyKeyFocus, prevMenuIdxRef, isKeyActive, headFocusItemInContent } = useContext(ContextForContent);
  const { style: innerStyle, ...otherInnerProps } = inner;
  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));
  const [width, setW] = useState(0);
  const [offsetL, setL] = useState(0);
  useLayoutEffect(() => {
    if (dynamicWidth && openedMenuIdx > -1) {
      const curSlate = panelsRef.current[openedMenuIdx];
      setW(curSlate?.scrollWidth || 0);
      if (close) {
        const curTrigger = btnsRef.current[openedMenuIdx];
        const offsetLeft = curTrigger != null ?
          curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlate.clientWidth / 2 :
          0;
        setL(offsetLeft);
      }
    }
  }, [openedMenuIdx, close, dynamicWidth]);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, false);

  if (openedMenuIdx < 0) return null;

  return <div
    ref={contentWrapperRef}
    style={{
      ...style,
      visibility: dynamicWidth ? width === 0 ? 'hidden' : 'visible' : null,
      width: dynamicWidth ? width : null }}
    {...contentWrapperProps}>
    <div
      onMouseOver={overMenuPanel}
      onMouseLeave={leaveMenuPanel}
      style={{
        ...innerStyle,
        transform: close ? `translate(${offsetL}px,${gap}px)` : `translateY(${gap}px)`,
        width: dynamicWidth ? width : null }}
      {...otherInnerProps}>
      {mapped[openedMenuIdx]}
    </div>
  </div>;
}

function getSlateWrapperTranslateVal(y, openedMenuIdx, triggerRef, slateClientWidthRef) {
  const curSlateWidth = slateClientWidthRef.current[openedMenuIdx];
  const curTrigger = triggerRef.current[openedMenuIdx];
  const left = (curSlateWidth == null || curTrigger == null) ?
    0 :
    (curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlateWidth / 2);
  return `translate(${left}px, ${y})`;
}

function getSlateTranslateVal(i, panelsOffsetLeftRef) {
  const left = i < 1 ? 0 : `-${panelsOffsetLeftRef.current[i]}px`;
  return `translateX(${left})`;
}