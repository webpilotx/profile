import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import api from "./api.js";

// https://vite.dev/config/
export default defineConfig({
  base: "/profile/",
  plugins: [
    tailwindcss(),
    react(),
    (() => ({
      name: "vite-plugin-api",
      configureServer(server) {
        server.middlewares.use(api);
      },
    }))(),
  ],
});
