import React, { Children, cloneElement, useContext } from "react";
import { ContextForMiniContent } from "./context";

export default function Content({ children }) {

  const { openedMenuIdx } = useContext(ContextForMiniContent);

  const mapped = Children.map(
    children,
    (child, i) =>
      cloneElement(child,
        { type: "C", orderI: i }));

  if (openedMenuIdx < 0) return null;
  return <div style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "blue",
    top: 0,
  }}>{ mapped }</div>;
}