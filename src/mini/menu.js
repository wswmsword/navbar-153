import React, { useState, useContext, useEffect, useRef } from "react";
import { ContextForMiniMenu } from "./context";

export default function Menu({ children, ...otherProps }) {

  const [h, setH] = useState(0);
  const { navRef, expanded, setE, btnsRef, openedMenuIdx,
    tailFocusItemInContent, headFocusItemInContent,
    toggleId, menuId } = useContext(ContextForMiniMenu);
  const [supportDvh, setDvh] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    setH(navRef.current.clientHeight);
    setDvh(supportsDynamicViewportHeight());
  }, []);

  const { style, ..._otherProps } = otherProps;

  if (!expanded) return null;

  return <div
    id={menuId}
    aria-labelledby={toggleId}
    tabIndex={-1}
    ref={menuRef}
    style={{
      height: `calc(100${supportDvh ? "d" : ""}vh - ${h}px)`,
      position: "absolute",
      left: 0,
      top: "100%",
      width: "100%",
      ...style,
    }}
    onKeyDown={trapTab}
    {..._otherProps}>
    {children}
  </div>;

  function trapTab(e) {
    if (e.key === "Escape" || e.keyCode === 27)
      setE(false);
    else if (e.key === "Tab" || e.keyCode === 9) {

      const btnsCount = btnsRef.current.length;

      // 焦点矫正
      if (e.shiftKey && e.target === menuRef.current) {
        if (openedMenuIdx < 0) btnsRef.current.slice(-1)[0].focus();
        else tailFocusItemInContent.current[openedMenuIdx].focus();
        e.preventDefault();
      }
      else if (!e.shiftKey && e.target === menuRef.current) {
        if (openedMenuIdx > -1) {
          headFocusItemInContent.current[openedMenuIdx].focus();
          e.preventDefault();
        }
      }

      // 内容面板内的首尾聚焦
      else if (e.shiftKey && openedMenuIdx > -1 && e.target === headFocusItemInContent.current[openedMenuIdx]) {
        tailFocusItemInContent.current[openedMenuIdx].focus();
        e.preventDefault();
      }
      else if (!e.shiftKey && openedMenuIdx > -1 && e.target === tailFocusItemInContent.current[openedMenuIdx]) {
        headFocusItemInContent.current[openedMenuIdx].focus();
        e.preventDefault();
      }

      // 触发器的首尾聚焦
      else if (e.shiftKey && openedMenuIdx < 0 && e.target === btnsRef.current[0]) {
        btnsRef.current[btnsCount - 1].focus();
        e.preventDefault();
      }
      else if (!e.shiftKey && openedMenuIdx < 0 && e.target === btnsRef.current[btnsCount - 1]) {
        btnsRef.current[0].focus();
        e.preventDefault();
      }
    }
  }
}

function supportsDynamicViewportHeight() {
  const testElement = document.createElement('div');
  testElement.style.height = '1dvh';
  document.body.appendChild(testElement);

  // Check if the computed height is greater than 0
  const isSupported = testElement.clientHeight > 0;
  document.body.removeChild(testElement);

  return isSupported;
}