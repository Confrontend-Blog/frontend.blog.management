import "./global.css";

import { initWhyDidYouRender } from "./utils/error-handling/why-did-you-render";

void (async () => {
  await initWhyDidYouRender();
  await import("./main");
})();
