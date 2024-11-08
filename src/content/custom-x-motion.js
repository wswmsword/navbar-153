import React from "react";
import MotionContentWrapper from "./wrapper/slide-motion";
import CustomMotionItems from "../items/custom-motion";

export default function CustomXMotionContent({ children, trans, xTrans, ...contentWrapperProps }) {

  return <MotionContentWrapper {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        trans={xTrans || trans}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </MotionContentWrapper>;
}
