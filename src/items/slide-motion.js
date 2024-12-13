import React, { Children, cloneElement, useLayoutEffect, useContext, useRef, useState, useEffect } from "react";
import { ContextForContent } from "../context";

/** 默认 X 轴切换动画的 Items
 * 
 * dom 装载 > 获取 dom left 值 > 设置动画初始状态 > tick（事件循环） > 设置动画 transition
 */
export default function Items({ children }) {
  const {
    openedMenuIdx,
    dur,
    prevMenuIdxRef,
    panelsRef,
  } = useContext(ContextForContent);

  /** 面板们的左边偏移量 */
  const panelsOffsetLeftRef = useRef([]);
  const [bookRender, forceRender] = useState();
  const [motion, setM] = useState(false);

  useLayoutEffect(() => {
    if (openedMenuIdx > -1) {
      // 缓存的元素们的尺寸
      panelsOffsetLeftRef.current = panelsRef.current.map(e => e?.offsetLeft || 0);
    }
  }, [openedMenuIdx]);

  useLayoutEffect(() => {
    forceRender({}); // 强制渲染初始状态
  }, []);

  useEffect(() => {
    if (bookRender != null)
      setM(true);
  }, [bookRender]);

  return Children.map(
    children,
    (child, i) =>
      cloneElement(child,
        { type: "C", orderI: i, contentItemStyle: genItemStyle() }));

  function genItemStyle() {
    return {
      transform: genDefaultTransform(),
      transition: motion ? `transform ${dur}s` : null,
      flexShrink: 0,
      width: "100%",
    };
  }

  function genDefaultTransform() {
    const prevI = prevMenuIdxRef.current;
    const i = openedMenuIdx < 0 ? prevI : openedMenuIdx;
    if (i < 1 || panelsOffsetLeftRef.current[i] == null) return null;
    return `translateX(-${panelsOffsetLeftRef.current[i]}px)`;
  }
}
