// https://vike.dev/Head

import React from "react";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="theme-color" content="#ffffff" />
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
