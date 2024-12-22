import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",

  // VitePWA doesn't automatically add the script tag to the HTML (it doesn't
  // seem to know how to deal with Vike), but we still need it to generate
  // `registerSW.js` for us.
  injectRegister: "script",

  manifest: {
    name: "My Vike App",
    short_name: "My Vike App",
    description: "Demo showcasing Vike",
    theme_color: "#202020",

    // Icons generated using https://favicon.inbrowser.app/tools/favicon-generator.
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/pwa-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

export default defineConfig({
  plugins: [vike({}), react({}), VitePWA(pwaConfig)],
});
