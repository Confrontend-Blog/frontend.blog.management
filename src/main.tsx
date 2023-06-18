import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { RootComponent } from "./root-component.tsx";

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootComponent />
    </BrowserRouter>
  </React.StrictMode>
);
