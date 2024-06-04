import React, { Children, cloneElement, useContext } from "react";
import { ContextForContent } from "./index";

export default function Content({ children, inner, style, ...contentWrapperProps }) {
  const {
    overMenuPanel,
    leaveMenuPanel,
    transitionEnd,
    transitionEnded,
    dur = ".5",
    height,
  } = useContext(ContextForContent);

  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));

  return <div
    onMouseOver={overMenuPanel}
    onMouseLeave={leaveMenuPanel}
    style={{
      ...style,
      height,
      visibility: transitionEnded ? "hidden" : "visible",
      overflow: "hidden",
      transition: `height ${dur}s`
    }}
    onTransitionEnd={transitionEnd}
    {...contentWrapperProps}>
    <div style={{ display: "flex", alignItems: "flex-start" }} {...inner}>
      {mapped}
    </div>
  </div>;
}

Content.displayName = "Content";