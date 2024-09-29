import React, { useContext, useEffect, useId, useState, useRef } from "react";
import { ContextForItem } from "./index";
import { MotionContentContext } from "./n-content-motion";

export default function Item({ children, type, orderI }) {
  const isTrigger = type === 'T';
  const isContent = type === 'C';
  const context = useContext(ContextForItem);
  const ariaId = useId();
  const motionContentContext = useContext(MotionContentContext);

  const { triggerAriaIds, contentAriaIds, prevMenuIdxRef, openedMenuIdx, isKeyActive, setActivePanel } = context;

  const [controlContentId, setControl] = useState(); // 收起 slate 会移除 dom，因此动态设置 id

  useEffect(() => {
    if (openedMenuIdx > -1 && prevMenuIdxRef.current < 0) {
      setControl(contentAriaIds.current[orderI]);
    } else if (openedMenuIdx < 0) {
      setControl(null);
    }
  }, [openedMenuIdx, orderI, controlContentId]);

  if (isTrigger) {
    if (typeof children === "function") {
      const { btnsRef, overMenu, leaveMenu } = context;
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
        "aria-controls": controlContentId,
      });
    }
    return children;
  }
  if (isContent) {
    const {
      panelsRef,
      headFocusItemInContent,
      tailFocusItemInContent,
      checkedFocusOwnerContent,
      prevMenuIdxRef,
      onlyKeyFocus,
      contentWrapperRef
    } = context;
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

    const { isCustomTrans, transitionBeforeStart, startCustomTransRef, panelsOffsetLeftRef, customTransProps } = motionContentContext || {};

    const style = motionContentContext ? (() => {
      let transStyles = {};
      if (isCustomTrans) {
        for (const p in customTransProps) {
          const v = customTransProps[p];
          const transitionProp = p === "transition";
          if (transitionProp) transStyles.transition = genCustomTransition(v);
          else {
            const arrayV = [].concat(v);
            if (arrayV.length > 3 || arrayV.length < 1) throw("customTransProps array length error");
            transStyles = {
              ...transStyles,
              [p]: arrayV.length === 2 ? genCustom2State(...arrayV) : genCustom3State(...arrayV),
            }
          }
        }
        transStyles.position = "absolute";
        if (transStyles.transition == null) transStyles.transition = genCustomTransition();
        if (openedMenu && startCustomTransRef.current) startCustomTransRef.current = false;
      } else {
        transStyles = {
          transform: genDefaultTransform(),
          transition: transitionBeforeStart ? null : `transform ${context.dur}s`,
        }
      }
      return transStyles;
    })() : null;

    return children({
      onKeyDown,
      ref: e => panelsRef.current[orderI] = e,
      style,
      id: ariaId,
      "aria-labelledby": triggerAriaIds.current[orderI],
      "aria-hidden": !openedMenu,
      tabIndex: -1
    },
    e => headFocusItemInContent.current[orderI] = e,
    e => tailFocusItemInContent.current[orderI] = e);

    function genCustom2State(start, end) {
      if (orderI === prevMenuIdxRef.current && openedMenuIdx < 0) return end;
      const isLeaveI = prevMenuIdxRef.current === orderI;
      if (isLeaveI) return start;
      if (openedMenu) {
        if (prevMenuIdxRef.current < 0) return end;
        if (startCustomTransRef.current) {
          return end;
        }
      }
      return start;
    }

    function genCustom3State(init, forward, backward) {
      const curI = openedMenuIdx;
      const prevI = prevMenuIdxRef.current;
      const isInitState = curI === -1 || prevI === -1;
      if (isInitState) return init;
      const isLeaveI = orderI === prevI;
      const isBackward = curI < prevI;
      if (isLeaveI) {
        return isBackward ? backward : forward;
      }
      if (openedMenu) {
        if (startCustomTransRef.current) {
          return init;
        }
        return isBackward ? forward : backward;  
      }
      return isBackward ? backward : forward;
    }

    function genDefaultTransform() {
      const prevI = prevMenuIdxRef.current;
      const i = openedMenuIdx < 0 ? prevI : openedMenuIdx;
      const left = i < 1 ? 0 : `-${panelsOffsetLeftRef.current[i]}px`;
      return `translateX(${left})`;
    }

    function genCustomTransition(v) {
      const defaultV = `all ${context.dur}s`;
      const finalV = v || defaultV;
      const isLeaveI = prevMenuIdxRef.current === orderI;
      if (isLeaveI) return finalV;
      if (openedMenu) {
        if (startCustomTransRef.current) {
          return finalV;
        }
        return null;
      }
      return finalV;
    }
  }

  return children;
}

Item.displayName = "Item";