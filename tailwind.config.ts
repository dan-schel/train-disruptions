import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// This plugin overrides the `leading-*` utilities to set `--line-spacing`
// instead of `line-height` directly. Aside from the loss of the fixed leading
// values, users shouldn't notice any difference except that single line text
// doesn't change height when using `leading-*`.
//
// Note: One day this can be avoided by setting a couple lines of CSS (see
// https://caniuse.com/css-text-box-trim).
const lineHeightOverridePlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        leading: (value) => ({
          "--line-spacing": value,
        }),
      },
      { values: theme("lineHeight") },
    );
  },
  {
    theme: {
      lineHeight: {
        none: "0em",
        tight: ".25em",
        snug: ".375em",
        normal: ".5em",
        relaxed: ".625em",
        loose: "1em",
      },
    },
  },
);

export default {
  content: ["./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    // Same as default Tailwind breakpoints, but defined in rem units.
    // Note: This override shouldn't be necessary in Tailwind 4.0.
    screens: {
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    },
    extend: {},
  },
  corePlugins: {
    // Disable the default `leading-*` utilities, so the override plugin works.
    lineHeight: false,
  },
  plugins: [lineHeightOverridePlugin],
} satisfies Config;
