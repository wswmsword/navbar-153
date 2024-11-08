import React, { Children, cloneElement, useLayoutEffect, useContext, useRef } from "react";
import { ContextForContent } from "../context";

/** 默认 X 轴切换动画的 Items */
export default function Items({ children, transitionBeforeStart }) {
  const {
    openedMenuIdx,
    dur,
    prevMenuIdxRef,
    panelsRef,
  } = useContext(ContextForContent);

  /** 面板们的左边偏移量 */
  const panelsOffsetLeftRef = useRef([]);

  useLayoutEffect(() => {
    if (openedMenuIdx > -1) {
      // 缓存的元素们的尺寸
      panelsOffsetLeftRef.current = panelsRef.current.map(e => e?.offsetLeft || 0);
    }
  }, [openedMenuIdx]);

  return Children.map(
    children,
    (child, i) =>
      cloneElement(child,
        { type: "C", orderI: i, contentItemStyle: genItemStyle(transitionBeforeStart) }));

  function genItemStyle(transitionBeforeStart) {
    return {
      transform: genDefaultTransform(),
      transition: transitionBeforeStart ? null : `transform ${dur}s`,
    };
  }

  function genDefaultTransform() {
    const prevI = prevMenuIdxRef.current;
    const i = openedMenuIdx < 0 ? prevI : openedMenuIdx;
    const left = i < 1 ? 0 : `-${panelsOffsetLeftRef.current[i]}px`;
    return `translateX(${left})`;
  }
}
