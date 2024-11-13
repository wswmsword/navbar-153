import React from "react";

export default function Group({ children, ...otherProps }) {
  return <div {...otherProps}>
    {children}
  </div>;
}

Group.displayName = "Group";