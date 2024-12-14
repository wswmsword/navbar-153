import React, { useContext, useLayoutEffect, useState, useEffect, useCallback, useRef } from "react";

import { useEntryExitFocus } from "../../hooks";
import { ContextForContent } from "../../context";

export default function ContentWrapper({ children, outer = {}, style, style2, innerStyle2, moveX, ...wrapperInnerProps }) {
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

  const [calcLayout, setLayout] = useState(false); // 获取尺寸
  const [show, setS] = useState(false); // 展示动画，横贯面板展开之前和收起之后
  /** 是否装载 dom */
  const loaded = openedMenuIdx > -1 || (openedMenuIdx < 0 && show);
  /** 面板们的宽度 */
  const panelsClientWidthRef = useRef([]);
  /** 面板的元素们的高度，完成过渡动画 */
  const panelsHeightRef = useRef([]);
  /** 面板元素们的宽度，完成过渡动画 */
  const panelsWidthRef = useRef([]);
  /** 动画正在进行吗，正在进行则不允许 tab 聚焦 */
  const transRunning = useRef(false);

  useLayoutEffect(() => {
    if (openedMenuIdx > -1 && calcLayout === false) {
      setLayout(true);
      // 缓存的元素们的尺寸
      panelsClientWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
      panelsHeightRef.current = panelsRef.current.map(e => e?.clientHeight || 0);
      panelsWidthRef.current = panelsRef.current.map(e => e?.clientWidth || 0);
    }
  }, [openedMenuIdx, calcLayout]);

  useEffect(() => {
    if (calcLayout) {
      transRunning.current = true;
      setS(true);
    }
  }, [calcLayout]);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, show);

  const transitionEnd = useCallback(e => {
    const contentWrapper = contentWrapperRef.current;
    if (e.target !== contentWrapper && e.target !== contentWrapper.parentNode) return; // 过滤冒泡的 transitionend 事件
    transRunning.current = false;
    if (openedMenuIdx < 0) {
      setS(false);
      setLayout(false);
      prevMenuIdxRef.current = -1;
    }
  }, [openedMenuIdx]);

  // loaded > 获取尺寸 > 初始状态 > tick > 动画状态
  if (loaded) {
    /** 是否为收起菜单操作 */
    const isCollapse = openedMenuIdx < 0 && prevMenuIdxRef.current > -1;
    const collapseOrTEnded = (!show || isCollapse);
    const xTransform = moveX(collapseOrTEnded, close, openedMenuIdx, prevMenuIdxRef, btnsRef, panelsClientWidthRef, gap);

    const { style: outerStyle, ...otherOuterProps } = outer;
    const width = !dynamicWidth ?
      "100%" :
      openedMenuIdx === -1 ?
        (panelsWidthRef.current[prevMenuIdxRef.current] || 0) :
        (panelsWidthRef.current[openedMenuIdx] || 0);

    const _innerStyle2 = typeof innerStyle2 === "function" ? innerStyle2(collapseOrTEnded, gap, dur) : innerStyle2;
    const _style2 = typeof style2 === "function" ? style2(gap) : style2;

    return <div
      style={{
        ..._style2,
        position: "absolute",
        left: 0,
        width,
        height: isCollapse ? panelsHeightRef.current[prevMenuIdxRef.current] : panelsHeightRef.current[openedMenuIdx],
        transition: show ? `transform ${dur}s, height ${dur}s, width ${dur}s` : null,
        transform: xTransform,
        ...outerStyle,
      }}
      onTransitionEnd={transitionEnd}
      {...otherOuterProps}>
      <div
        ref={contentWrapperRef}
        onMouseOver={overMenuPanel}
        onMouseLeave={leaveMenuPanel}
        style={{
          ..._innerStyle2,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          ...style,
        }}
        {...wrapperInnerProps}>
        {typeof children === "function" ? children({ transRunning }) : children}
      </div>
    </div>;
  }
  return null;
}
