import React, { cloneElement, useContext } from "react";
import { ContextForMiniItem } from "./context";

export default function Item({ children, type, orderI }) {

  const isTrigger = type === 'T'; // 是否触发器
  const isContent = type === 'C'; // 是否内容面板

  const context = useContext(ContextForMiniItem);
  const { openedMenuIdx } = context;
  const opened = openedMenuIdx === orderI;

  if (isTrigger) {

    const { openOrCloseContentById, btnsRef } = context;

    const triggerProps = {
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
    const getHead = e => headFocusItemInContent.current[orderI] = e;
    const getTail = e => tailFocusItemInContent.current[orderI] = e;
    const contentProps = {};

    if (typeof children === "function")
      return children(contentProps, getHead, getTail);
    return cloneElement(children, { head: getHead, tail: getTail, propsFromN: contentProps });
  }

  return <>{children}</>;
}

Item.displayName = "Item";