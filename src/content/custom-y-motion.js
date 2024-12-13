import React from "react";
import Items from "../items/slide-motion";
import CustomMotionContentWrapper from "./wrapper/custom-motion";

export default function CustomYMotionContent({ children, yTrans, trans, xTrans, ...contentWrapperProps }) {

  return <CustomMotionContentWrapper trans={yTrans || trans} {...contentWrapperProps}>
      <Items>{children}</Items>
  </CustomMotionContentWrapper>;
}
