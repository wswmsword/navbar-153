import React, { useContext } from "react";
import { ContextForTrigger } from "./context";
import { passTypeAndOrderI } from "./utils";

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
  const mapped = passTypeAndOrderI(children);
  return <div {...triggerWrapperProps} ref={wrapperRef} onKeyDown={focusBackToSlateFromTrigger}>{mapped}</div>;
}

Trigger.displayName = "Trigger";
