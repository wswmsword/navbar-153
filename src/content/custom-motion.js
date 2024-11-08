import React from "react";
import CustomMotionItems from "../items/custom-motion";
import CustomMotionContentWrapper from "./wrapper/custom-motion";

export default function CustomMotionContent({ children, yTrans, xTrans, trans, ...contentWrapperProps }) {

  return <CustomMotionContentWrapper trans={yTrans} {...contentWrapperProps}>
    {({ transRunning }) =>
      <CustomMotionItems
        trans={xTrans}
        transRunning={transRunning}>{children}</CustomMotionItems>}
  </CustomMotionContentWrapper>;
}