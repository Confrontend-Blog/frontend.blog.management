import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "src/main.tsx",
      output: {
        entryFileNames: `[name]-host.js`,
        chunkFileNames: `[name]-host.js`,
        assetFileNames: `[name]-host.[ext]`,
        format: "system",
      },
      external: [
        "@mui/material",
        "react",
        "react-dom",
      ],
    },
  },
});


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build:{
//     cssCodeSplit: false,
//     rollupOptions: {
//       input: "src/main.tsx",
//       output: {
//         entryFileNames: `[name].js`,
//         chunkFileNames: `[name].js`,
//         assetFileNames: `[name].[ext]`,
//         format: "esm",
//       },
//       preserveEntrySignatures: "strict",
//     },
//   },
// });
