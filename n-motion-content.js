import React from "react";
import Items from "./n-items"
import MotionContentWrapper from "./n-motion-content-wrapper";

export default function MotionContent({ children, inner = {}, style, ...contentWrapperProps }) {

  return <MotionContentWrapper
    inner={inner}
    style={style}
    {...contentWrapperProps}>
    {({ transitionBeforeStart }) =>
      <Items
        transitionBeforeStart={transitionBeforeStart}>{children}</Items>}
  </MotionContentWrapper>;
}
