import React from "react";
import CustomMotionItems from "./n-custom-motion-items";
import CustomMotionContentWrapper from "./n-custom-motion-content-wrapper";

export default function CustomMotionContent({ children, yTrans, xTrans, ...contentWrapperProps }) {

  return <CustomMotionContentWrapper trans={yTrans} {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        trans={xTrans}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </CustomMotionContentWrapper>;
}