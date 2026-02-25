import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.tsx",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      // Do NOT externalize React — bundle it for the widget runtime.
      // anywidget loads ESM directly; there is no shared React context.
    },
    sourcemap: true,
    minify: "esbuild",
  },
});
