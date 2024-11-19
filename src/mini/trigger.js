import React from "react";
import { passTypeAndOrderI } from "../utils";

export default function Trigger({ children, ...otherProps }) {
  const mapped = passTypeAndOrderI(children);

  const { style, ..._otherProps } = otherProps;

  return <div
    style={{
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
    {..._otherProps}>
    {mapped}
  </div>;
}
