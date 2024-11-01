import React from "react";
import MotionContentWrapper from "./n-motion-content-wrapper";
import CustomMotionItems from "./n-custom-motion-items";

export default function CustomXMotionContent({ children, customTransProps, ...contentWrapperProps }) {

  return <MotionContentWrapper {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        customTransProps={customTransProps}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </MotionContentWrapper>;
}
