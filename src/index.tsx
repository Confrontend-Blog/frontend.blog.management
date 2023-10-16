import "./global.css";

import { initWhyDidYouRender } from "./utils/error-handling/why-did-you-render";

// All this because wdyr must get loaded before any other react component
void (async () => {
  await initWhyDidYouRender();
  await import("./main");
})();
