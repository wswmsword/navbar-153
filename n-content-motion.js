import React, { Children, cloneElement, useContext, useLayoutEffect, useState, useEffect, useCallback, useRef, createContext } from "react";

import { useEntryExitFocus } from "./useHooks";
import { ContextForContent } from "./index";

export const MotionContentContext = createContext();

export default function ContentWithMotion({ children, inner = {}, customTransProps, style, ...contentWrapperProps }) {
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

  const [destroyContent, setDestroy] = useState(true);
  const loaded = openedMenuIdx > -1;
  /** 面板们的宽度 */
  const panelsClientWidthRef = useRef([]);
  /** 面板们的左边偏移量 */
  const panelsOffsetLeftRef = useRef([]);
  /** 面板的元素们的高度，完成过渡动画 */
  const panelsHeightRef = useRef([]);
  /** 面板元素们的宽度，完成过渡动画 */
  const panelsWidthRef = useRef([]);
  const [transitionBeforeStart, setBeforeStart] = useState(true); // 收起的过渡动画结束了吗
  /** 动画正在进行吗，正在进行则不允许 tab 聚焦 */
  const transRunning = useRef(false);
  /** 是否自定义切换动画 */
  const isCustomTrans = customTransProps != null;
  const [, setCustomTrans] = useState(); // 触发后，重新渲染，用于面板切换过渡动画
  const startCustomTransRef = useRef(false); // 为 true 时，开始进行结束状态动画，开始后设为 false

  useLayoutEffect(() => {
    transRunning.current = true;
    if (openedMenuIdx > -1) {
      setDestroy(false);
      if (openedMenuIdx > -1 && prevMenuIdxRef.current > -1) {
        isCustomTrans && setCustomTrans({}); // 刷新自定义过渡动画
        startCustomTransRef.current = true;
      }
      // 缓存的元素们的尺寸
      panelsClientWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
      panelsOffsetLeftRef.current = panelsRef.current.map(e => e?.offsetLeft || 0);
      panelsHeightRef.current = panelsRef.current.map(e => e?.clientHeight || 0);
      panelsWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
    }
  }, [openedMenuIdx]);

  useEffect(() => {
    if (transitionBeforeStart && !destroyContent) {
      setTimeout(() => {
        setBeforeStart(false);
      }, 11); // 90fps
    }
  }, [destroyContent, transitionBeforeStart]);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, !transitionBeforeStart);

  const transitionEnd = useCallback(e => {
    const contentWrapper = contentWrapperRef.current;
    if (e.target !== contentWrapper) return; // 过滤冒泡的 transitionend 事件
    transRunning.current = false;
    if (openedMenuIdx < 0) {
      setBeforeStart(true);
      setDestroy(true);
    }
  }, [openedMenuIdx]);

  if (loaded || (!loaded && !destroyContent)) {
    /** 是否为收起菜单操作 */
    const isCollapse = openedMenuIdx < 0 && prevMenuIdxRef.current > -1;
    const nextContentInnerTransformVal = (() => {

      const collapseOrTEnded = (transitionBeforeStart || isCollapse);
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

    const { style: innerStyle, ...otherInnerProps } = inner;
    const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));
    const width = !dynamicWidth ?
      null :
      openedMenuIdx === -1 ?
        (panelsWidthRef.current[prevMenuIdxRef.current] || 0) :
        (panelsWidthRef.current[openedMenuIdx] || 0);

    return <MotionContentContext.Provider value={{
      transitionBeforeStart,
      transRunning,
      isCustomTrans,
      startCustomTransRef,
      panelsOffsetLeftRef,
      customTransProps,
    }}><div
      ref={contentWrapperRef}
      style={{
        ...style,
        visibility: transitionBeforeStart ? "hidden" : "visible",
        height: transitionBeforeStart ? "0" : (+ gap + panelsHeightRef.current[openedMenuIdx] || 0),
        width,
        transition: transitionBeforeStart ? null : `height ${dur}s, width ${dur}s`,
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
          display: !isCustomTrans && "flex",
          alignItems: !isCustomTrans && "flex-start",
          width,
          height: isCollapse ? panelsHeightRef.current[prevMenuIdxRef.current] : panelsHeightRef.current[openedMenuIdx],
          transition: transitionBeforeStart ? null : `transform ${dur}s, height ${dur}s, width ${dur}s`,
          transform: nextContentInnerTransformVal,
          overflow: "hidden",
        }}
        {...otherInnerProps}>
        {mapped}
      </div>
    </div></MotionContentContext.Provider>;
  }
  return null;
}


function getSlateWrapperTranslateVal(y, openedMenuIdx, triggerRef, slateClientWidthRef) {
  const curSlateWidth = slateClientWidthRef.current[openedMenuIdx];
  const curTrigger = triggerRef.current[openedMenuIdx];
  const left = (curSlateWidth == null || curTrigger == null) ?
    0 :
    (curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlateWidth / 2);
  return `translate(${left}px, ${y})`;
}
