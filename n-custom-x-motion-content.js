import React from "react";
import MotionContentWrapper from "./n-motion-content-wrapper";
import CustomMotionItems from "./n-custom-motion-items";

export default function CustomXMotionContent({ children, inner = {}, customTransProps, style, ...contentWrapperProps }) {

  return <MotionContentWrapper
    inner={inner}
    style={style}
    {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        customTransProps={customTransProps}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </MotionContentWrapper>;
}
