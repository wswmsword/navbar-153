import React from "react";
import ContentWrapper from "./base";
import { getSlateWrapperTranslateVal } from "../../utils";

export default function CustomMotionContentWrapper({ children, trans = {}, className = "", ...props }) {

  const { className: cnByTrans = "", transition, ...otherTrans } = trans;
  const _className = className.concat(" ", transition == null ? cnByTrans : "");

  const moveX = (collapseOrTEnded, close, openedMenuIdx, prevMenuIdxRef, btnsRef, panelsClientWidthRef, gap) => {

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

  function moveY(collapseOrTEnded) {
    const [start, end] = Object.keys(otherTrans).reduce((acc, cur) => [{
      ...acc[0],
      [cur]: trans[cur][0]
    }, {
      ...acc[1],
      [cur]: trans[cur][1]
    }], [{}, {}]);
    const style = collapseOrTEnded ? start : end;
    return {
      ...style,
      transition,
      display: "flex",
      alignItems: "flex-start",
    };
  }

  return <ContentWrapper
    moveX={moveX}
    innerStyle2={moveY}
    className={_className}
    {...props}>
    {children}
  </ContentWrapper>
}