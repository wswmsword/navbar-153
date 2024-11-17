import React, { useState, useContext, useEffect } from "react";
import { ContextForMiniMenu } from "./context";

export default function Menu({ children, ...otherProps }) {

  const [h, setH] = useState(0);
  const { navRef, expanded } = useContext(ContextForMiniMenu);
  const [supportDvh, setDvh] = useState(false);

  useEffect(() => {
    setH(navRef.current.clientHeight);
    setDvh(supportsDynamicViewportHeight());
  }, []);

  const { style, ..._otherProps } = otherProps;

  if (!expanded) return null;
  console.log(12)
  return <div
    style={{
      height: `calc(100${supportDvh ? "d" : ""}vh - ${h}px)`,
      position: "absolute",
      left: 0,
      width: "100%",
      ...style,
    }}
    {..._otherProps}>
    {children}
  </div>;
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