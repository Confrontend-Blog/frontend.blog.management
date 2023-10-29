module.exports = {
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/*.test.{ts,tsx}",
  ],
  coverageReporters: ["json", "lcov", "text", "html", "cobertura"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^.+\\.css$": "jest-preview/transforms/css",
    // "^@Confrontend/ui-library$":
    //   "<rootDir>/__mocks__/@Confrontend/ui-library.js",
  },
  // ui.library is no longer an es module (rather cjs), so it does not need to be re-compiled by babel
  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!@Confrontend/ui-library)",
  // ],
  roots: ["<rootDir>/src"],
  setupFiles: [],

  setupFilesAfterEnv: [
    "<rootDir>/src/utils/test/setup/setup-tests.ts",
    "<rootDir>/src/utils/test/setup/global-imports.ts",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testTimeout: 100000,
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
      },
    ],
  ],
};
