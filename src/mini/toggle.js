import React, { useContext, useEffect, useRef } from "react";
import { ContextForMiniToggle } from "./context";

export default function Toggle() {
  
  const { setE, expanded, openOrCloseContentById, btnsRef } = useContext(ContextForMiniToggle);
  const toggleRef = useRef();

  useEffect(() => {
    if (expanded == null) return ; // 忽略初始化
    if (expanded) btnsRef.current[0].focus();
    else toggleRef.current.focus();
  }, [expanded]);

  return <button
    onClick={() => {
      setE(!expanded);
      openOrCloseContentById(-1);
    }}
    ref={toggleRef}>
    {expanded ? "Expanded" : "Collapsed"}
  </button>;
}