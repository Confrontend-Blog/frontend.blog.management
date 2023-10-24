import "@testing-library/jest-dom";

(global as any)._import_meta = {
  env: {
    VITE_BACKEND_URL: "http://mocked-url.com",
  },
};
