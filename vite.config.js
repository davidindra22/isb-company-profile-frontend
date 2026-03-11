import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ngrok
  server: {
    host: true,
    allowedHosts: ["d75c-114-10-8-37.ngrok-free.app"],
    // proxy: {
    //   "/api": "http://localhost:5000",
    // },
  },
});
