import React, { Children, useContext, useMemo } from "react";
import { passTypeAndOrderI } from "../utils";
import { ContextForMiniTrigger } from "./context";

export default function Trigger({ children, ...otherProps }) {
  const mapped = passTypeAndOrderI(children);
  const { openedMenuIdx } = useContext(ContextForMiniTrigger)

  const { style, ..._otherProps } = otherProps;

  if (openedMenuIdx > -1) return null;

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

/** 计算触发器总数，用于为头尾触发器添加键盘事件，用于循环聚焦 */
function getItemsCount(children, count = 0) {
  Children.forEach(children, c => {
    const dn = (c.type || {}).displayName;
    if (dn === "Item") {
      ++ count;
    } else if (dn === "Group") {
      count = getItemsCount(c.props.children, count);
    }
  });

  return count;
}