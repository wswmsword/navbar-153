import React from "react";
import Items from "./n-items";
import CustomMotionContentWrapper from "./n-custom-motion-content-wrapper";

export default function CustomYMotionContent({ children, ...contentWrapperProps }) {

  return <CustomMotionContentWrapper {...contentWrapperProps}>
    {({ transitionBeforeStart }) =>
      <Items
        transitionBeforeStart={transitionBeforeStart}>{children}</Items>}
  </CustomMotionContentWrapper>;
}
