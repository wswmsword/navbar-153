import React, { useState, useContext, useEffect, useRef } from "react";
import { ContextForMiniMenu } from "./context";

export default function Menu({ children, ...otherProps }) {

  const [h, setH] = useState(0);
  const { navRef, expanded, setE, btnsRef } = useContext(ContextForMiniMenu);
  const [supportDvh, setDvh] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    setH(navRef.current.clientHeight);
    setDvh(supportsDynamicViewportHeight());
  }, []);

  const { style, ..._otherProps } = otherProps;

  if (!expanded) return null;

  return <div
    tabIndex={-1}
    ref={menuRef}
    style={{
      height: `calc(100${supportDvh ? "d" : ""}vh - ${h}px)`,
      position: "absolute",
      left: 0,
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
      if (e.shiftKey && e.target === menuRef.current) {
        btnsRef.current.slice(-1)[0].focus();
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