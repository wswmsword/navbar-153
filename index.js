import React, { createContext, useState, useRef, useEffect, useCallback, useMemo } from "react";
import Item from "./n-item";
import Content from "./n-content";
import Trigger from "./n-trigger";

export const Context = createContext({});
export const ContextForContent = createContext({});

NavBar.Item = Item;
NavBar.Content = Content;
NavBar.Trigger = Trigger;

export default function NavBar({ children, ...navProps }) {

  /** 保存 trigger 的 aria-id */
  const triggerAriaIds = useRef([]);
  /** 保存 content 的 aria-id */
  const contentAriaIds = useRef([]);

  const [openedMenuIdx, setIdx] = useState(-1); // 当前菜单序号
  /** 上一个菜单序号 */
  const prevMenuIdxRef = useRef(-1);
  /** 是否为收起菜单操作 */
  const isCollapse = openedMenuIdx < 0 && prevMenuIdxRef.current > -1;

  /** 菜单按钮的元素们 */
  const btnsRef = useRef([]);
  /** 面板的元素们的高度，完成过渡动画  */
  const panelsHeightRef = useRef([]);
  /** 面板的元素们 */
  const panelsRef = useRef([]);
  /** 如果不想离开，则清空这个 timer */
  const leaveTimerRef = useRef();
  /** 是否变高 */
  const isPanelGetHigherRef = useRef(false);

  if (panelsHeightRef.current.length > 0) {
    const prevActiveH = panelsHeightRef.current[prevMenuIdxRef.current];
    const curActiveH = panelsHeightRef.current[openedMenuIdx];
    isPanelGetHigherRef.current = (curActiveH || 0) > (prevActiveH || 0);
  }

  const setActivePanel = useCallback(cur => {
    setIdx(v => {
      prevMenuIdxRef.current = v;
      return cur;
    });
  }, []);

  /** 进入菜单面板 */
  const overMenuPanel = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  /** 进入一个菜单按钮 */
  const overMenu = (e) => {
    overMenuPanel();
    const target = e.target;
    const targetIdx = btnsRef.current.findIndex(e => e === target);
    if (targetIdx > -1 && targetIdx !== openedMenuIdx) {
      setActivePanel(targetIdx);
    }
  };

  /** 离开一个菜单按钮 */
  const leaveMenu = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    leaveTimerRef.current = setTimeout(() => {
      setActivePanel(-1);
      leaveTimerRef.current = null;
    }, 420);
  }, []);

  /** 离开菜单面板 */
  const leaveMenuPanel = leaveMenu;

  /** 点击菜单按钮 */
  const clickMenuBtn = e => {
    const target = e.target;
    const targetIdx = btnsRef.current.findIndex(e => e === target);
    if (targetIdx > -1) {
      if (targetIdx === openedMenuIdx) {
        // 关闭菜单
        setActivePanel(-1);
      } else {
        // 打开菜单
        setActivePanel(targetIdx);
      }
    }
  };

  /** 按下 Esc 退出菜单 */
  const escapeMenu = idx => e => {
    if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
      // 关闭菜单
      setActivePanel(-1);
    }

    const head = headFocusItemInContent.current[idx]
    const tail = tailFocusItemInContent.current[idx];
    // 焦点矫正
    if (e.target === panelsRef.current[idx]) {
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

  // 缓存元素们的高度
  useEffect(() => {
    panelsHeightRef.current = panelsRef.current.map(e => e?.scrollHeight || 0);
  }, []);

  const [xStartIdx, setStartI] = useState(-1); // 过渡动画起点按钮编号
  const [xEndIdx, setEndI] = useState(-1); // 过渡动画结束按钮编号

  const [transitionEnded, setEnded] = useState(true); // 收起的过渡动画结束了吗

  useEffect(() => {
    if (openedMenuIdx > -1 && prevMenuIdxRef.current < 0 && transitionEnded) {
      setStartI(openedMenuIdx)
      setTimeout(() => {
        setEnded(false);
      }, 18);
    }
    if (openedMenuIdx > -1) setEndI(openedMenuIdx);
  }, [openedMenuIdx, transitionEnded]);

  const transitionEnd = useCallback(() => {
    setStartI(openedMenuIdx);
    if (openedMenuIdx < 0) setEnded(true);
    else {
      const head = headFocusItemInContent.current[openedMenuIdx];
      if (head) head.focus();
      else panelsRef.current[openedMenuIdx].focus();
    }
  }, [openedMenuIdx]);

  const nextTransformVal = transitionEnded
    ? `translate(${getTransformXVal(0, xStartIdx)}, -100%)`
    : isCollapse
    ? `translate(${getTransformXVal(0, xEndIdx)}, -100%)`
    : `translateX(${getTransformXVal(0, xEndIdx)})`;

  const headFocusItemInContent = useRef([]);
  const tailFocusItemInContent = useRef([]);

  // 离开的焦点控制
  useEffect(() => {
    if (openedMenuIdx < 0) {
      if (prevMenuIdxRef.current > -1) {
        btnsRef.current[prevMenuIdxRef.current].focus();
      }
    }
  }, [openedMenuIdx]);

  const contentContextVal = useMemo(() => ({
    overMenuPanel,
    leaveMenuPanel,
    panelsHeightRef,
    transitionEnd,
    openedMenuIdx,
    transitionEnded,
  }), [openedMenuIdx, transitionEnded]);

  return <Context.Provider value={{
    escapeMenu,
    panelsRef,
    btnsRef,
    nextTransformVal,
    transitionEnded,
    clickMenuBtn,
    overMenu,
    leaveMenu,
    openedMenuIdx,
    triggerAriaIds,
    contentAriaIds,
    headFocusItemInContent,
    tailFocusItemInContent,
  }}>
    <ContextForContent.Provider value={contentContextVal}>
      <nav aria-label="Main" {...navProps}>
        {children}
      </nav>
    </ContextForContent.Provider>
  </Context.Provider>;
}

function getTransformXVal(a, b) {
  const transformVal = a > b ? a - b : b - a;
  return transformVal === 0 ? 0 : (a < b ? "-" : "") + `${transformVal}00%`;
}