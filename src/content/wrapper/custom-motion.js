import React from "react";
import ContentWrapper from "./base";
import { getSlateWrapperTranslateVal } from "../../utils";

export default function CustomMotionContentWrapper({ children, trans = {}, className = "", ...props }) {

  const { className: cnByTrans = "", transition, ...otherTrans } = trans;
  const _className = className.concat(" ", cnByTrans);

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

  function moveY(collapseOrTEnded, _, dur) {
    const [start, end, stringProps] = Object.keys(otherTrans).reduce((acc, cur) => {
      if (typeof trans[cur] === "string") {
        return [acc[0], acc[1], {
          ...acc[2],
          [cur]: otherTrans[cur],
        }]
      }
      return [{
        ...acc[0],
        [cur]: trans[cur][0]
      }, {
        ...acc[1],
        [cur]: trans[cur][1]
      }, acc[2]];
    }, [{}, {}, {}]);
    const style = collapseOrTEnded ? start : end;
    const hasTransition = transition !== false;
    return {
      ...style,
      ...stringProps,
      transition: hasTransition ? (() => {
        if (transition == null) {
          const tProps = Object.keys(otherTrans || {}).filter(p => Array.isArray(otherTrans[p]));
          return tProps.map(p => `${p} ${dur}s`).join();
        }
        return transition;
      })() : null,
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