import React, { Children, cloneElement, useContext, useLayoutEffect, useRef, useState } from "react";
import { ContextForContent } from "./n";
import { ContextForContent as ContextFormReducedMotionContent } from "./n-reduced-motion";
import { ContextMotion } from "./index";

export default function Content({ children, inner = {}, style, ...contentWrapperProps }) {
  const motion = useContext(ContextMotion);
  return motion ?
    <ContentWithMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentWithMotion> :
    <ContentReducedMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentReducedMotion>
}

Content.displayName = "Content";

function ContentWithMotion({ children, inner = {}, style, ...contentWrapperProps }) {
  const {
    overMenuPanel,
    leaveMenuPanel,
    transitionEnd,
    transitionEnded,
    dur,
    innerHeight,
    gapHeight,
    width,
    triggerWrapperRef,
    contentWrapperRef,
    nextContentInnerTransformVal,
    destroyContent,
  } = useContext(ContextForContent);

  if (destroyContent) return null;

  const { style: innerStyle, ...otherInnerProps } = inner;
  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));

  return <div
    ref={contentWrapperRef}
    style={{
      ...style,
      height: transitionEnded ? "0" : gapHeight,
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
        height: innerHeight,
        transition: `transform ${dur}s, height ${dur}s, width ${dur}s`,
        transform: nextContentInnerTransformVal,
        overflow: "hidden",
      }}
      {...otherInnerProps}>
      {mapped}
    </div>
  </div>;
}

function ContentReducedMotion({ children, inner = {}, style, ...contentWrapperProps }) {
  const { leaveMenuPanel, gap, triggerWrapperRef, contentWrapperRef, openedMenuIdx, dynamicWidth, panelsRef, close, btnsRef } = useContext(ContextFormReducedMotionContent);
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

  if (openedMenuIdx < 0) return null;

  return <div
    ref={contentWrapperRef}
    style={{
      ...style,
      visibility: dynamicWidth ? width === 0 ? 'hidden' : 'visible' : null,
      width: dynamicWidth ? width : null }}
    {...contentWrapperProps}>
    <div
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