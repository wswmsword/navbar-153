import React, { Children, cloneElement, useContext } from "react";
import { ContextForMiniContent } from "./context";

export default function Content({ children, ...otherProps }) {

  const { openedMenuIdx } = useContext(ContextForMiniContent);

  const mapped = Children.map(
    children,
    (child, i) =>
      cloneElement(child,
        { type: "C", orderI: i }));

  const { style, ..._otherProps } = otherProps;

  if (openedMenuIdx < 0) return null;
  return <div style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    ...style,
  }}
  {..._otherProps}>{ mapped }</div>;
}