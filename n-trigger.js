import React, { Children, cloneElement } from "react";

export default function Trigger({ children, ...triggerWrapperProps }) {
  let relatedIdx = -1;
  const mapped = Children.map(children, child => {
    if (typeof child.props.children == "function") ++ relatedIdx;
    return cloneElement(child, { type: "T", orderI: relatedIdx });
  });
  return <div {...triggerWrapperProps}>{mapped}</div>;
}

Trigger.displayName = "Trigger";