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
};

export default defineConfig({
  plugins: [vike({}), react({}), VitePWA(pwaConfig)],
});
