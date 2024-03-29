import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://60.204.208.146:8090",
        rewrite: (path) => path.replace(/\/api/, ""),
      },
      "/minio": {
        target: "http://139.224.72.78:8888",
        rewrite: (path) => path.replace(/\/minio/, ""),
      },
    },
  },
});
