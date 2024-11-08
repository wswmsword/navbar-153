import React, { Children, cloneElement, useContext, useLayoutEffect, useState } from "react";

import { useEntryExitFocus } from "../hooks";
import { ContextForContent } from "../context";

export default function ContentReducedMotion({ children, inner = {}, style, ...contentWrapperProps }) {
  const { leaveMenuPanel, overMenuPanel, gap, contentWrapperRef, openedMenuIdx, dynamicWidth, panelsRef, close, btnsRef, onlyKeyFocus, prevMenuIdxRef, isKeyActive, headFocusItemInContent } = useContext(ContextForContent);
  const { style: innerStyle, ...otherInnerProps } = inner;
  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));
  const [width, setW] = useState(0);
  const [offsetL, setL] = useState(0);
  useLayoutEffect(() => {
    if (dynamicWidth && openedMenuIdx > -1) {
      const curSlate = panelsRef.current[openedMenuIdx];
      setW(curSlate?.clientWidth || 0);
    }
    if (openedMenuIdx > -1 && close) {
      const curSlate = panelsRef.current[openedMenuIdx];
      const curTrigger = btnsRef.current[openedMenuIdx];
      const offsetLeft = curTrigger != null ?
        curTrigger.offsetLeft + curTrigger.clientWidth / 2 - curSlate.clientWidth / 2 :
        0;
      setL(offsetLeft);
    }
  }, [openedMenuIdx, close, dynamicWidth]);

  // 焦点的入口和出口控制
  useEntryExitFocus(openedMenuIdx, onlyKeyFocus, prevMenuIdxRef, isKeyActive, btnsRef, panelsRef, headFocusItemInContent, true);

  if (openedMenuIdx < 0) return null;

  return <div
    ref={contentWrapperRef}
    style={{
      position: "absolute",
      left: 0,
      width: dynamicWidth ? width : "100%",
      visibility: dynamicWidth ? width === 0 ? 'hidden' : 'visible' : null,
      transform: close ? `translate(${offsetL}px,${gap}px)` : `translateY(${gap}px)`,
      ...style }}
    {...contentWrapperProps}>
    <div
      onMouseOver={overMenuPanel}
      onMouseLeave={leaveMenuPanel}
      style={{
        width: dynamicWidth ? width : null,
        ...innerStyle }}
      {...otherInnerProps}>
      {mapped[openedMenuIdx]}
    </div>
  </div>;
}