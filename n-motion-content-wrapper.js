import React from "react";
import ContentWrapper from "./n-content-wrapper";
import { getSlateWrapperTranslateVal } from "./utils";

export default function MotionContentWrapper({ children, ...props }) {


  const getNextContentInnerTransformVal = (collapseOrTEnded, close, openedMenuIdx, prevMenuIdxRef, btnsRef, panelsClientWidthRef, gap) => {

    if (close) {
      return collapseOrTEnded ?
        getSlateWrapperTranslateVal(
          "-100%",
          openedMenuIdx < 0 ? prevMenuIdxRef.current : openedMenuIdx,
          btnsRef,
          panelsClientWidthRef) :
        getSlateWrapperTranslateVal(`${gap}px`, openedMenuIdx, btnsRef, panelsClientWidthRef);

    } else {
      return collapseOrTEnded ?
        `translateY(-100%)`: // 入场的初始状态（退场结束）
        `translateY(${gap}px)`; // 入场的结束状态（退场初始）
    }
  }

  return <ContentWrapper
    getNextContentInnerTransformVal={getNextContentInnerTransformVal}
    style2={{
      clipPath: "inset(0 -100vw -100vw -100vw)",
    }}
    innerStyle2={{
      display: "flex",
      alignItems: "flex-start",
    }}
    {...props}>
    {children}
  </ContentWrapper>
}