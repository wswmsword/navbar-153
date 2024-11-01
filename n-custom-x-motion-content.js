import React from "react";
import MotionContentWrapper from "./n-motion-content-wrapper";
import CustomMotionItems from "./n-custom-motion-items";

export default function CustomXMotionContent({ children, trans, ...contentWrapperProps }) {

  return <MotionContentWrapper {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        trans={trans}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </MotionContentWrapper>;
}
