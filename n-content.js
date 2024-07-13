import React, { useContext } from "react";
import { ContextForContent } from "./index";
import ContentWithMotion from "./n-content-motion";
import ContentReducedMotion from "./n-content-reduced-motion";

export default function Content({ children, inner = {}, style, ...contentWrapperProps }) {
  const { motion } = useContext(ContextForContent);
  return motion ?
    <ContentWithMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentWithMotion> :
    <ContentReducedMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentReducedMotion>
}

Content.displayName = "Content";
