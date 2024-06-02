import React, { Children, cloneElement, useContext, useEffect } from 'react';
import { ContextForContent } from "./index";

export default function Content({ children, inner, ...contentWrapperProps }) {
  const {
    overMenuPanel,
    leaveMenuPanel,
    panelsHeightRef,
    transitionEnd,
    openedMenuIdx,
    transitionEnded,
  } = useContext(ContextForContent);

  const mapped = Children.map(children, (child, i) => cloneElement(child, { type: "C", orderI: i }));

  return <div
    onMouseOver={overMenuPanel}
    onMouseLeave={leaveMenuPanel}
    style={{ height: panelsHeightRef.current[openedMenuIdx] || 0, visibility: transitionEnded ? 'hidden' : 'visible' }}
    onTransitionEnd={transitionEnd}
    {...contentWrapperProps}>
    <div style={{ display: "flex", alignItems: "flex-start" }} {...inner}>
      {mapped}
    </div>
  </div>;
}

Content.displayName = "Content";