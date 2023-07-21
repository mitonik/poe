import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/poe/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Plains of Eidolon Interactive World Map",
        short_name: "PoE Map",
        start_url: "/poe/",
        display: "standalone",
        background_color: "#000",
        theme_color: "#000",
        description: "Interactive world map for Warframe.",
        icons: [
          {
            src: "maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "maskable_icon_x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "maskable_icon_x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
