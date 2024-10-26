import React, { useContext } from "react";
import ContentWithCustomMotion from "./n-content-custom-motion";
import ContentReducedMotion from "./n-content-reduced-motion";
import { ContextForContent } from "./context";

export default function Content({ children, inner = {}, style, customTransProps, ...contentWrapperProps }) {
  const { motion } = useContext(ContextForContent);
  return motion ?
    <ContentWithCustomMotion inner={inner} style={style} customTransProps={customTransProps} {...contentWrapperProps}>{children}</ContentWithCustomMotion> :
    <ContentReducedMotion inner={inner} style={style} {...contentWrapperProps}>{children}</ContentReducedMotion>
}

Content.displayName = "Content";
