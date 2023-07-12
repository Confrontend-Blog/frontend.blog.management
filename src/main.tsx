import "./global.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { RootComponent } from "./root-component.tsx";

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>
);
