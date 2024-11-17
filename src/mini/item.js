import React, { cloneElement, useContext } from "react";
import { ContextForMiniItem } from "./context";

export default function Item({ children, type, orderI }) {

  const isTrigger = type === 'T'; // 是否触发器
  const isContent = type === 'C'; // 是否内容面板

  const context = useContext(ContextForMiniItem);
  const { openedMenuIdx } = context;
  const opened = openedMenuIdx === orderI;

  if (isTrigger) {

    const { setIdx } = context;

    const triggerProps = {
      onClick() {
        if (opened) setIdx(-1);
        else setIdx(orderI);
      }
    };

    if (typeof children === "function")
      return children(triggerProps);
    return cloneElement(children, triggerProps);
  } else if (isContent) {
    if (opened) return children;
    else return null;
  }

  return <>{children}</>;
}

Item.displayName = "Item";