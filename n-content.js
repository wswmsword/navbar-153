import React, { Children, cloneElement, useContext, useRef } from "react";
import { ContextForContent } from "./index";

export default function Content({ children, inner = {}, style, ...contentWrapperProps }) {
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
    nextContentInnerTransformVal,
    destroyContent,
  } = useContext(ContextForContent);

  if (destroyContent) return null;

  const { style: innerStyle, ...otherInnerProps } = inner;
  const contentWrapperRef = useRef();
  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));

  return <div
    onMouseOver={overMenuPanel}
    onMouseLeave={leaveMenuPanel}
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

Content.displayName = "Content";