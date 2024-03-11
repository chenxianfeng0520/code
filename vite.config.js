import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

export default defineConfig({
  base: "./lottery",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://172.16.16.76:8090",
        rewrite: (path) => path.replace(/\/api/, ""),
      },
    },
  },
});
