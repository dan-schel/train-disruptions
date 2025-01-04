import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// This plugin overrides the `leading-*` utilities to set `--line-spacing`
// instead of `line-height` directly. Aside from the loss of the fixed leading
// values, users shouldn't notice any difference except that single line text
// doesn't change height when using `leading-*`.
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
    extend: {},
  },
  corePlugins: {
    // Disable the default `leading-*` utilities, so the override plugin works.
    lineHeight: false,
  },
  plugins: [lineHeightOverridePlugin],
} satisfies Config;
