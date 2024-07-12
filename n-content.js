import React, { useContext, createContext } from "react";
import { ContextMotion } from "./index";
import ContentWithMotion from "./n-content-motion";
import ContentReducedMotion from "./n-content-reduced-motion";

export default function Content({ children, inner = {}, style, ...contentWrapperProps }) {
  const motion = useContext(ContextMotion);
  return motion ?
    <ContentWithMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentWithMotion> :
    <ContentReducedMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentReducedMotion>
}

Content.displayName = "Content";

