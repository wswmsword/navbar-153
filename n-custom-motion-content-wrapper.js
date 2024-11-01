import React from "react";
import ContentWrapper from "./n-content-wrapper";
import { getSlateWrapperTranslateVal } from "./utils";

export default function CustomMotionContentWrapper({ children, trans = [], ...props }) {

  const getNextContentInnerTransformVal = (collapseOrTEnded, close, openedMenuIdx, prevMenuIdxRef, btnsRef, panelsClientWidthRef, gap) => {

    if (close) {
      const menuIdx = collapseOrTEnded && openedMenuIdx < 0 ? prevMenuIdxRef.current : openedMenuIdx;
      return getSlateWrapperTranslateVal(
        `${gap}px`,
        menuIdx,
        btnsRef,
        panelsClientWidthRef);
    }

    return `translateY(${gap}px`;
  }

  function collapseOrExpand(collapseOrTEnded) {
    const [start, end] = Object.keys(trans).reduce((acc, cur) => [{
      ...acc[0],
      [cur]: trans[cur][0]
    }, {
      ...acc[1],
      [cur]: trans[cur][1]
    }], [{}, {}]);
    return collapseOrTEnded ? start : end;
  }

  return <ContentWrapper
    getNextContentInnerTransformVal={getNextContentInnerTransformVal}
    style2={collapseOrExpand}
    innerStyle2={{
      display: "flex",
      alignItems: "flex-start",
    }}
    {...props}>
    {children}
  </ContentWrapper>
}