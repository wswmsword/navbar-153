import React, { forwardRef, useContext } from "react"
import { ContextForMiniBack } from "./context"

export default forwardRef(function Back({ children, ...otherProps }, ref) {
  const setIdx = useContext(ContextForMiniBack);
  return <button onClick={() => setIdx(-1)} {...otherProps} ref={ref}>{children || "Back"}</button>
});