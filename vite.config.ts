import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.VITE_BACKEND_URL": JSON.stringify(
      process.env.VITE_BACKEND_URL
    ),
    "process.env.VITE_CLIENT_ID": JSON.stringify(process.env.VITE_CLIENT_ID),
    "process.env.VITE_ENVIRONMENT": JSON.stringify(
      process.env.VITE_ENVIRONMENT
    ),
  },
  server: {
    port: 8000,
    // TODO see why api/* wildcard isn't working
    proxy: {
      "/api/v1/articles/summaries": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/mgmt/image/upload": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/mgmt/articles": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/auth/chat-token": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1/users": {
        target: "http://localhost:9000",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
  plugins: [react()],
});
