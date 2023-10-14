import "./global.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { RootComponent } from "./root-component";
import { initWhyDidYouRender } from "./utils/error-handling/why-did-you-render";

void (async () => {
  await initWhyDidYouRender();
})();

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>
);
