import React, { useContext } from "react";
import { ContextForMiniToggle } from "./context";

export default function Toggle() {
  
  const { setE, expanded, setIdx } = useContext(ContextForMiniToggle);

  return <button onClick={() => {
    setE(!expanded);
    setIdx(-1);
  }}>
    {expanded ? "Expanded" : "Collapsed"}
  </button>;
}