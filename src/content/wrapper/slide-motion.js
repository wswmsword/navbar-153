import React from "react";
import ContentWrapper from "./base";
import { getSlateWrapperTranslateVal } from "../../utils";

export default function MotionContentWrapper({ children, ...props }) {

  const moveX = (collapseOrTEnded, close, openedMenuIdx, prevMenuIdxRef, btnsRef, panelsClientWidthRef, gap) => {

    if (close) {
      const menuIdx = collapseOrTEnded && openedMenuIdx < 0 ? prevMenuIdxRef.current : openedMenuIdx;
      return getSlateWrapperTranslateVal(`${gap}px`, menuIdx, btnsRef, panelsClientWidthRef);
    }
    return `translateY(${gap}px)`;
  }

  function moveY(collapseOrTEnded, gap, dur) {
    return {
      display: "flex",
      alignItems: "flex-start",
      transform: collapseOrTEnded ? `translateY(calc(-100% - ${gap}px))` : `translateY(0)`,
      transition: `transform ${dur}s`,
    }
  }

  return <ContentWrapper
    moveX={moveX}
    style2={gap => ({
      clipPath: `inset(-${gap}px -100vw -100vw -100vw)`,
    })}
    innerStyle2={moveY}
    {...props}>
    {children}
  </ContentWrapper>
}