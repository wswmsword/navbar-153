import React, { Children, cloneElement } from 'react';
import { useContext } from "react";
import { ContextForContent } from "./index";

export default function Content({ children, inner, ...contentWrapperProps }) {
  const {
    overMenuPanel,
    leaveMenuPanel,
    panelsHeightRef,
    transitionEnd,
    openedMenuIdx,
  } = useContext(ContextForContent);

  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));

  return <div
    onMouseOver={overMenuPanel}
    onMouseLeave={leaveMenuPanel}
    style={{ height: panelsHeightRef.current[openedMenuIdx] || 0 }}
    onTransitionEnd={transitionEnd}
    {...contentWrapperProps}>
    <div style={{ display: "flex", alignItems: "flex-start" }} {...inner}>
      {mapped}
    </div>
  </div>;
}

Content.displayName = "Content";