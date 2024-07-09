import React, { useContext, useEffect, useId, useState } from "react";
import { Context } from "./index";

export default function Item({ children, type, orderI }) {
  const isTrigger = type === 'T';
  const isContent = type === 'C';
  const nbContext = useContext(Context);
  const ariaId = useId();
  const [controlOrDescribeId, setCD] = useState();

  useEffect(() => {
    setCD(isTrigger ?
      nbContext.contentAriaIds.current[orderI] :
      nbContext.triggerAriaIds.current[orderI]);
  }, []);

  if (isTrigger) {
    if (typeof children === "function") {
      const { btnsRef, overMenu, leaveMenu, triggerAriaIds, openedMenuIdx, setActivePanel, isKeyActive } = nbContext;
      const openedMenu = openedMenuIdx === orderI;
      triggerAriaIds.current[orderI] = ariaId;
      /** 点击菜单按钮 */
      const clickMenuBtn = e => {
        const target = e.target;
        let targetIdx = btnsRef.current.findIndex(e => e === target);
        if (targetIdx < 0) targetIdx = btnsRef.current.findIndex(e => e.contains(target));
        if (targetIdx > -1) {
          isKeyActive.current = e.nativeEvent.offsetX === 0 && e.nativeEvent.offsetY === 0;
          if (targetIdx === openedMenuIdx) {
            // 关闭菜单
            setActivePanel(-1);
          } else {
            // 打开菜单
            setActivePanel(targetIdx);
          }
        }
      };
      return children({
        ref: e => btnsRef.current[orderI] = e,
        onClick: clickMenuBtn,
        onMouseOver: overMenu,
        onMouseLeave: leaveMenu,
        id: ariaId,
        "aria-expanded": openedMenu,
        "aria-controls": controlOrDescribeId,
      });
    }
    return children;
  }
  if (isContent) {
    const {
      escapeMenu,
      panelsRef,
      nextContentItemTransformVal,
      transitionEnded,
      contentAriaIds,
      headFocusItemInContent,
      tailFocusItemInContent,
      openedMenuIdx,
    } = nbContext;
    const openedMenu = openedMenuIdx === orderI;
    contentAriaIds.current[orderI] = ariaId;
    return children({
      onKeyDown: escapeMenu(orderI),
      ref: e => panelsRef.current[orderI] = e,
      style: {
        transform: nextContentItemTransformVal,
        transition: transitionEnded ? null : `transform ${nbContext.dur}s`,
      },
      id: ariaId,
      "aria-labelledby": controlOrDescribeId,
      "aria-hidden": !openedMenu,
      tabIndex: 0,
    },
    e => headFocusItemInContent.current[orderI] = e,
    e => tailFocusItemInContent.current[orderI] = e);
  }

  return children;
}

Item.displayName = "Item";