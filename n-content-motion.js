import React, { Children, cloneElement, useLayoutEffect, useContext, useRef } from "react";
import { ContextForContent } from "./context";
import ContentWrapper from "./n-content-wrapper";

export default function ContentWithMotion({ children, inner = {}, style, ...contentWrapperProps }) {

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

  return <ContentWrapper
    inner={inner}
    style={style}
    innerStyleFromContent={{
      display: "flex",
      alignItems: "flex-start",
    }}
    {...contentWrapperProps}>
    {({ transitionBeforeStart }) =>
      Children.map(
        children,
        (child, i) => cloneElement(child, { type: "C", orderI: i, contentItemStyle: genItemStyle(transitionBeforeStart) }))}
  </ContentWrapper>;

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
