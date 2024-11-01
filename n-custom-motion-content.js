import React from "react";
import CustomMotionItems from "./n-custom-motion-items";
import CustomMotionContentWrapper from "./n-custom-motion-content-wrapper";

export default function CustomMotionContent({ children, customTransProps, ...contentWrapperProps }) {

  return <CustomMotionContentWrapper {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        customTransProps={customTransProps}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </CustomMotionContentWrapper>;
}