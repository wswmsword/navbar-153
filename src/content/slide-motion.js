import React from "react";
import Items from "../items/slide-motion";
import MotionContentWrapper from "./wrapper/slide-motion";

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
