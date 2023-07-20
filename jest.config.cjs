// jest.config.js
// eslint-disable-next-line no-undef
module.exports = {
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "babel-jest",
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "jest-preview/transforms/file",
  },
};
