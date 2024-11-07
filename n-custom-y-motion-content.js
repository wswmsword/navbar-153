import React from "react";
import Items from "./n-items";
import CustomMotionContentWrapper from "./n-custom-motion-content-wrapper";

export default function CustomYMotionContent({ children, yTrans, trans, ...contentWrapperProps }) {

  return <CustomMotionContentWrapper trans={yTrans || trans} {...contentWrapperProps}>
    {({ transitionBeforeStart }) =>
      <Items
        transitionBeforeStart={transitionBeforeStart}>{children}</Items>}
  </CustomMotionContentWrapper>;
}
