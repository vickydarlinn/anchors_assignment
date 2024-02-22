import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // target: "https://bf54-27-123-240-82.ngrok.io",
        target: "http://localhost:6970",
        changeOrigin: true,
      },
    },
  },
});
