import React, { cloneElement, useContext } from "react";
import { ContextForMiniItem } from "./context";

export default function Item({ children, type, orderI }) {

  const isTrigger = type === 'T'; // 是否触发器
  const isContent = type === 'C'; // 是否内容面板

  const context = useContext(ContextForMiniItem);
  const { openedMenuIdx } = context;
  const opened = openedMenuIdx === orderI;

  if (isTrigger) {

    const { setIdx, btnsRef, triggersCountRef } = context;

    const tailI = triggersCountRef.current - 1;
    const isTail = tailI === orderI;
    const isHead = orderI === 0;

    const triggerProps = {
      onClick() {
        if (opened) setIdx(-1);
        else setIdx(orderI);
      },
      ref: e => btnsRef.current[orderI] = e,
      onKeyDown: (isTail || isHead) ? trapTab : null,
    };

    if (typeof children === "function")
      return children(triggerProps);
    return cloneElement(children, triggerProps);

    /** 循环聚焦头尾 */
    function trapTab(e) {

      if (e.key === "Tab" || e.keyCode === 9) {

        if (e.shiftKey && isHead) {
          btnsRef.current[tailI].focus();
          e.preventDefault();
        }
        if (!e.shiftKey && isTail) {
          btnsRef.current[0].focus();
          e.preventDefault();
        }
      }
    }


  } else if (isContent) {
    if (opened) return children;
    else return null;
  }

  return <>{children}</>;
}

Item.displayName = "Item";