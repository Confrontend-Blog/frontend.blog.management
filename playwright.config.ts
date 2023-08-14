import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    // Specify headless mode
    headless: false,

    // Use desktop viewport size
    viewport: { width: 1280, height: 720 },

    // Additional browser context options
    ignoreHTTPSErrors: true,
  },
};

export default config;
