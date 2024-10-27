import React, { Children, cloneElement, useContext, useLayoutEffect, useState, useRef } from "react";
import ContentWrapper from "./n-content-wrapper";
import { ContextForContent } from "./context";

export default function ContentWithCusomizedMotion({ children, inner = {}, customTransProps, style, ...contentWrapperProps }) {
  const {
    openedMenuIdx,
    dur,
    prevMenuIdxRef,
    collapsePrevMenuIdx2Ref,
  } = useContext(ContextForContent);

  const [, setCustomTrans] = useState(); // 触发后，重新渲染，用于面板切换过渡动画
  const startCustomTransRef = useRef(false); // 为 true 时，开始进行结束状态动画，开始后设为 false

  useLayoutEffect(() => {
    if (openedMenuIdx > -1) {
      if (prevMenuIdxRef.current > -1 || collapsePrevMenuIdx2Ref.current > -1) {
        setCustomTrans({});
        startCustomTransRef.current = true;
      }
    }
  }, [openedMenuIdx]);

  return <ContentWrapper inner={inner} style={style} {...contentWrapperProps}>
    {({ transRunning }) =>
      Children.map(
        children,
        (child, i) => cloneElement(child, { type: "C", orderI: i, contentItemStyle: genItemStyle(i), transRunning }))}
  </ContentWrapper>;

  function genItemStyle(orderI) {
    let transStyles = {};
    const openedMenu = openedMenuIdx === orderI;
    for (const p in customTransProps) {
      const v = customTransProps[p];
      const transitionProp = p === "transition";
      if (transitionProp) transStyles.transition = genCustomTransition(v, orderI);
      else {
        const arrayV = [].concat(v);
        if (arrayV.length > 3 || arrayV.length < 1) throw("customTransProps array length error");
        transStyles = {
          ...transStyles,
          [p]: arrayV.length === 2 ? genCustom2State(...arrayV, orderI) : genCustom3State(...arrayV, orderI),
        }
      }
    }
    transStyles.position = "absolute";
    if (transStyles.transition == null) transStyles.transition = genCustomTransition(null, orderI);
    if (openedMenu && startCustomTransRef.current) startCustomTransRef.current = false;
    return transStyles;
  }

  function genCustom2State(start, end, orderI) {
    if (orderI === prevMenuIdxRef.current && openedMenuIdx < 0) return end;
    const isLeaveI = prevMenuIdxRef.current === orderI;
    if (isLeaveI) return start;
    const openedMenu = openedMenuIdx === orderI;
    if (openedMenu) {
      if (prevMenuIdxRef.current < 0) return end;
      if (startCustomTransRef.current) {
        return end;
      }
    }
    return start;
  }

  function genCustom3State(init, forward, backward, orderI) {
    const openedMenu = openedMenuIdx === orderI;
    const curI = openedMenuIdx;
    const prevI = prevMenuIdxRef.current;
    const prevI2 = collapsePrevMenuIdx2Ref.current;
    const commonExpand = curI > -1 && prevI < 0 && prevI2 < 0;
    const collapse = curI < 0;
    const isInitState = commonExpand || collapse;
    if (isInitState) return init;
    const isBackward = prevI2 > 0 ? curI < prevI2 : curI < prevI;
    if (openedMenu) {
      if (startCustomTransRef.current) {
        return init;
      }
      return isBackward ? forward : backward;
    }
    return isBackward ? backward : forward;
  }

  function genCustomTransition(v, orderI) {
    const defaultV = `all ${dur}s`;
    const finalV = v || defaultV;
    const isLeaveI = prevMenuIdxRef.current === orderI;
    if (isLeaveI) return finalV;
    const openedMenu = openedMenuIdx === orderI;
    if (openedMenu) {
      if (startCustomTransRef.current) {
        return finalV;
      }
      return null;
    }
    return finalV;
  }
}
