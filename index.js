import React, { createContext } from "react";
import Item from "./n-item";
import Content from "./n-content";
import Trigger from "./n-trigger";
import N from "./n";
import NReducedMotion from "./n-reduced-motion";

export const Context = createContext({});
export const ContextForTrigger = createContext();
export const ContextMotion = createContext();

NavBar.Item = Item;
NavBar.Content = Content;
NavBar.Trigger = Trigger;

export default function NavBar({ children, dur = 0.5, gap = 0, dynamicWidth = false, onlyKeyFocus = true, close = false, motion = true, ...navProps }) {
  return <ContextMotion.Provider value={motion}>
    {motion ?
      <N dur={dur} gap={gap} dynamicWidth={dynamicWidth} onlyKeyFocus={onlyKeyFocus} close={close} {...navProps}>{children}</N> :
      <NReducedMotion gap={gap} dynamicWidth={dynamicWidth} onlyKeyFocus={onlyKeyFocus} close={close} {...navProps}>{children}</NReducedMotion>}
  </ContextMotion.Provider>
}