import React, { useContext, useLayoutEffect, useState, useEffect, useCallback, useRef } from "react";

import { useEntryExitFocus } from "./useHooks";
import { ContextForContent } from "./context";

export default function ContentWrapper({ children, inner = {}, style, style2, innerStyle2, getNextContentInnerTransformVal, ...contentWrapperProps }) {
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
  /** 面板的元素们的高度，完成过渡动画 */
  const panelsHeightRef = useRef([]);
  /** 面板元素们的宽度，完成过渡动画 */
  const panelsWidthRef = useRef([]);
  const [transitionBeforeStart, setBeforeStart] = useState(true); // 收起的过渡动画结束了吗
  /** 动画正在进行吗，正在进行则不允许 tab 聚焦 */
  const transRunning = useRef(false);

  useLayoutEffect(() => {
    transRunning.current = true;
    if (openedMenuIdx > -1) {
      setDestroy(false);
      // 缓存的元素们的尺寸
      panelsClientWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
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
    if (e.target !== contentWrapper && e.target !== contentWrapper.parentNode) return; // 过滤冒泡的 transitionend 事件
    transRunning.current = false;
    if (openedMenuIdx < 0) {
      setBeforeStart(true);
      setDestroy(true);
      prevMenuIdxRef.current = -1;
    }
  }, [openedMenuIdx]);

  if (loaded || (!loaded && !destroyContent)) {
    /** 是否为收起菜单操作 */
    const isCollapse = openedMenuIdx < 0 && prevMenuIdxRef.current > -1;
    const collapseOrTEnded = (transitionBeforeStart || isCollapse);
    const nextContentInnerTransformVal = getNextContentInnerTransformVal(collapseOrTEnded, close, openedMenuIdx, prevMenuIdxRef, btnsRef, panelsClientWidthRef, gap);

    const { style: innerStyle, ...otherInnerProps } = inner;
    const width = !dynamicWidth ?
      null :
      openedMenuIdx === -1 ?
        (panelsWidthRef.current[prevMenuIdxRef.current] || 0) :
        (panelsWidthRef.current[openedMenuIdx] || 0);

    const _style2 = typeof style2 === "function" ? style2(collapseOrTEnded) : style2;

    return <div
      style={{
        ...style,
        ..._style2,
      }}
      onTransitionEnd={transitionEnd}
      {...contentWrapperProps}>
      <div
        ref={contentWrapperRef}
        onMouseOver={overMenuPanel}
        onMouseLeave={leaveMenuPanel}
        style={{
          ...innerStyle,
          ...innerStyle2,
          width,
          height: isCollapse ? panelsHeightRef.current[prevMenuIdxRef.current] : panelsHeightRef.current[openedMenuIdx],
          transition: transitionBeforeStart ? null : `transform ${dur}s, height ${dur}s, width ${dur}s`,
          transform: nextContentInnerTransformVal,
          overflow: "hidden",
        }}
        {...otherInnerProps}>
        {children({ transitionBeforeStart, transRunning })}
      </div>
    </div>;
  }
  return null;
}
