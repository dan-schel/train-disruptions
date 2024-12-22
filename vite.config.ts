import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaConfig: Partial<VitePWAOptions> = {
  // TODO: No idea what to set this to. This is what I've used in the past?
  registerType: "autoUpdate",

  // VitePWA doesn't automatically add the script tag to the HTML (it doesn't
  // seem to know how to deal with Vike), but we still need it to generate
  // `registerSW.js` for us.
  injectRegister: "script",

  // Do not cache HTML (for now). Not caching HTML means this app won't do
  // anything offline (which kinda defeats the purpose of a PWA), but the config
  // is complicated because we're doing SSR, so I'll leave it for later.
  //
  // If I understand the docs at https://vite-pwa-org.netlify.app/guide/static-assets
  // correctly, this doesn't work for stuff in the public directory. They need
  // to go in `includeAssets` instead.
  workbox: {
    globPatterns: ["**/*.{js,css,ico,png,svg}"],
  },

  includeAssets: [
    // Anything else in the public folder we want to be precached. No need to
    // include the manifest icons here though, they're included by default.
    // "/whatever.woff2",
  ],

  // TODO: Work out how to add a custom "You're offline" page.

  manifest: {
    name: "My Vike App",
    short_name: "My Vike App",
    description: "Demo showcasing Vike",

    // Acts as a default value for 'theme-color' if not set in the HTML.
    // Probably not needed in our case?
    theme_color: "#202020",

    // Splash screen background color.
    background_color: "#FFFFFF",

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
