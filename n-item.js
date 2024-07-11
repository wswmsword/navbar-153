import React, { useContext, useEffect, useId, useState } from "react";
import { Context } from "./index";
import { MotionContentContext } from "./n-content";

export default function Item({ children, type, orderI }) {
  const isTrigger = type === 'T';
  const isContent = type === 'C';
  const nbContext = useContext(Context);
  const ariaId = useId();
  const [controlOrDescribeId, setCD] = useState();
  const motionContentContext = useContext(MotionContentContext);

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
      panelsRef,
      contentAriaIds,
      headFocusItemInContent,
      tailFocusItemInContent,
      openedMenuIdx,
      isKeyActive,
      setActivePanel,
      checkedFocusOwnerContent,
      prevMenuIdxRef,
      onlyKeyFocus,
      contentWrapperRef
    } = nbContext;
    const openedMenu = openedMenuIdx === orderI;
    contentAriaIds.current[orderI] = ariaId;

    /** 菜单面板上的键盘操作 */
    const onKeyDown = e => {
      if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
        // 关闭菜单
        isKeyActive.current = true;
        setActivePanel(-1);
        return;
      }

      if (e.key === "Tab" || e.keyCode === 9) {
        // 动画进行时期，禁止 tab，避免聚焦引起的样式错位
        if (motionContentContext?.transRunning?.current) {
          e.preventDefault();
          return;
        }
        // 非键盘模式下切换菜单之后，按下 tab
        if (!checkedFocusOwnerContent.current && prevMenuIdxRef.current > -1 && onlyKeyFocus && !isKeyActive.current) {
          const activeE = document.activeElement;
          if (contentWrapperRef.current?.contains(activeE)) { // 焦点在所有面板的 wrapper 中
            const focusTarget = panelsRef.current[openedMenuIdx]; // 当前面板
            if (!focusTarget.contains(activeE)) { // 焦点不在当前面板
              checkedFocusOwnerContent.current = true;
              focusTarget.focus({ preventScroll: true });
              e.preventDefault();
              return;
            }
          }
        }
      }

      const head = headFocusItemInContent.current[orderI]
      const tail = tailFocusItemInContent.current[orderI];
      // 焦点矫正
      if (e.target === panelsRef.current[orderI]) {
        if (e.key === "Tab" || e.keyCode === 9) {
          if (e.shiftKey) {
            tail && tail.focus();
          } else {
            head && head.focus();
          }
          e.preventDefault();
        }
      }

      // 回尾
      if (e.target === head && (e.key === "Tab" || e.keyCode === 9) && e.shiftKey) {
        tail && tail.focus();
        e.preventDefault();
      }

      // 回头
      if (e.target === tail && (e.key === "Tab" || e.keyCode === 9) && !e.shiftKey) {
        head && head.focus();
        e.preventDefault();
      }
    };

    const style = motionContentContext ? {
        transform: motionContentContext.nextContentItemTransformVal,
        transition: motionContentContext.transitionEnded ? null : `transform ${nbContext.dur}s`,
      } :
      null;

    return children({
      onKeyDown,
      ref: e => panelsRef.current[orderI] = e,
      style,
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