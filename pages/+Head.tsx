// https://vike.dev/Head

import React from "react";
import { usePageContext } from "vike-react/usePageContext";

export default function HeadDefault() {
  const { custom } = usePageContext();

  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content={custom.settings.theme === "dark" ? "#121212" : "#ffffff"}
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content={custom.settings.theme === "light" ? "#ffffff" : "#121212"}
      />
      <RegisterPwa />
    </>
  );
}

function RegisterPwa() {
  // Vite PWA only creates `manifest.webmanifest` and `registerSW.js` in the dist
  // folder, so they're not available in dev mode.
  if (import.meta.env.DEV) {
    return <></>;
  }

  return (
    <>
      <link rel="manifest" href="/manifest.webmanifest" />
      <script defer src="/registerSW.js" />
    </>
  );
}
