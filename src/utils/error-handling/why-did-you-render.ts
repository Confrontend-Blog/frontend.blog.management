import React from "react";

export async function initWhyDidYouRender() {
  if (process.env.NODE_ENV === "development") {
    const whyDidYouRender = await import(
      "@welldone-software/why-did-you-render"
    );
    whyDidYouRender.default(React, {
      logOwnerReasons: true,
    });
  }
}
