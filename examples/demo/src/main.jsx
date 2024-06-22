import React from "react";
import ReactDOM from "react-dom/client";
import Docs from "./components/docs";
import Header from "./components/header";
import Footer from "./components/footer";
import CenterBox from "./components/center-box";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <CenterBox>
      <Docs />
      <Footer />
    </CenterBox>
  </React.StrictMode>,
)
