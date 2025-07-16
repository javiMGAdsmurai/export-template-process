import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Optimizaciones de desarrollo
  server: {
    port: 5173,
    open: true,
    host: true
  },
  
  // Optimizaciones de build
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          utils: ["jszip"]
        }
      }
    }
  },
  
  // Resolución de paths
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  
  // Optimizaciones de CSS
  css: {
    devSourcemap: true
  }
});
  