import React, { cloneElement, useContext, useEffect, useId, useState } from "react";
import { ContextForMiniItem } from "./context";

export default function Item({ children, type, orderI }) {

  const isTrigger = type === 'T'; // 是否触发器
  const isContent = type === 'C'; // 是否内容面板

  const context = useContext(ContextForMiniItem);
  const [, forceRenderForAriaId] = useState();
  const { openedMenuIdx, triggerIdsRef, contentIdsRef } = context;
  const opened = openedMenuIdx === orderI;
  const id = useId();

  useEffect(() => {
    // 仅重渲染 trigger，content 比 trigger 后渲染，因此对于 content 和 trigger 的 id 都已知，无需浏览器绘制后获取
    if (openedMenuIdx > -1 && isTrigger) forceRenderForAriaId({});
  }, [openedMenuIdx]);

  if (isTrigger) {

    const { openOrCloseContentById, btnsRef } = context;
    triggerIdsRef.current[orderI] = id;

    const triggerProps = {
      id,
      "aria-controls": openedMenuIdx > -1 ? contentIdsRef.current[orderI] : null,
      "aria-expanded": opened,
      onClick() {
        if (opened) openOrCloseContentById(-1);
        else openOrCloseContentById(orderI);
      },
      ref: e => btnsRef.current[orderI] = e,
    };

    if (typeof children === "function")
      return children(triggerProps);
    return cloneElement(children, triggerProps);

  } else if (isContent) {

    if (!opened) return null;

    const { headFocusItemInContent, tailFocusItemInContent } = context;

    contentIdsRef.current[orderI] = id;

    const getHead = e => headFocusItemInContent.current[orderI] = e;
    const getTail = e => tailFocusItemInContent.current[orderI] = e;
    const contentProps = {
      id,
      "aria-labelledby": triggerIdsRef.current[orderI],
    };

    if (typeof children === "function")
      return children(contentProps, getHead, getTail);
    return cloneElement(children, { head: getHead, tail: getTail, propsFromN: contentProps });
  }

  return <>{children}</>;
}

Item.displayName = "Item";