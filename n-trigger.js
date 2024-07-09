import React, { Children, cloneElement, useContext } from "react";
import { ContextForTrigger } from "./index";

export default function Trigger({ children, ...triggerWrapperProps }) {
  const { wrapperRef, openedMenuIdx, headFocusItemInContent, panelsRef } = useContext(ContextForTrigger);
  const focusBackToSlateFromTrigger = (e) => {
    if (openedMenuIdx > -1 && (e.key === "Tab" || e.keyCode === 9)) {
      const head = headFocusItemInContent.current[openedMenuIdx];
      e.preventDefault();
      if (head) head.focus({ preventScroll: true });
      else panelsRef.current[openedMenuIdx].focus({ preventScroll: true });
    }
  };
  let relatedIdx = -1;
  const mapped = Children.map(children, child => {
    if (typeof child.props.children == "function") ++ relatedIdx;
    return cloneElement(child, { type: "T", orderI: relatedIdx });
  });
  return <div {...triggerWrapperProps} ref={wrapperRef} onKeyDown={focusBackToSlateFromTrigger}>{mapped}</div>;
}

Trigger.displayName = "Trigger";