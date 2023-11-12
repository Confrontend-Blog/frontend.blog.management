import "./global.css";

import { withSentryReactRouterV6Routing } from "@sentry/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";

import { RootComponent } from "./root-component";
import SetupSentry from "./utils/error-handling/sentry.config";
import { initWhyDidYouRender } from "./utils/error-handling/why-did-you-render";

void (async () => {
  await initWhyDidYouRender();
})();

SetupSentry();

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>
);
