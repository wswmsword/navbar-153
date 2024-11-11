import React from "react";
import ReactDOM from "react-dom/client";
import Docs from "./components/docs";
import Header from "./components/header";
import Footer from "./components/footer";
import CenterBox from "./components/center-box";
import "./index.css"
import { createContext } from "react";
import { useState } from "react";

export const Context = createContext();
export const ContextF = createContext();

const container = ReactDOM.createRoot(document.getElementById("root"));

container.render(<App />)

function App() {
  const [go, setG] = useState(false);
  return <Context.Provider value={{ go }}>
    <ContextF.Provider value={setG}>
      <Header />
      <CenterBox>
        <Docs />
        <Footer />
      </CenterBox>
    </ContextF.Provider>
  </Context.Provider>
}