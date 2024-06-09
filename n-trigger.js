import React, { Children, cloneElement, useContext } from "react";
import { ContextForTrigger } from "./index";

export default function Trigger({ children, ...triggerWrapperProps }) {
  const wrapperRef = useContext(ContextForTrigger);
  let relatedIdx = -1;
  const mapped = Children.map(children, child => {
    if (typeof child.props.children == "function") ++ relatedIdx;
    return cloneElement(child, { type: "T", orderI: relatedIdx });
  });
  return <div {...triggerWrapperProps} ref={wrapperRef}>{mapped}</div>;
}

Trigger.displayName = "Trigger";