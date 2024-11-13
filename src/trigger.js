import React, { Children, cloneElement, useContext } from "react";
import { ContextForTrigger } from "./context";

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
  const mapped = passTypeAndOrderI(children, -1);
  return <div {...triggerWrapperProps} ref={wrapperRef} onKeyDown={focusBackToSlateFromTrigger}>{mapped}</div>;
}

Trigger.displayName = "Trigger";

/** 递归地为 `<Item>` 设置 `type` 和 `orderI` */
function passTypeAndOrderI(children, relatedIdx) {
  return Children.map(children, child => {
    const dn = (child.type || {}).displayName;
    if (dn === "Item") {
      ++ relatedIdx;
      return cloneElement(child, { type: "T", orderI: relatedIdx });
    } else if (dn === "Group") {
      return cloneElement(child, {
        children: passTypeAndOrderI(child.props.children, relatedIdx),
      });
    }
    return child;
  });
}