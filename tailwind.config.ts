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

// This plugin overrides the `hover` variant to only apply when the device
// supports hovering. This prevents "sticky" hover styles on touch devices.
//
// Note: This is fixed in Tailwind 4.0, so we can remove it then!
const touchFriendlyHoverPlugin = plugin(function ({ addVariant }) {
  addVariant("hover", "@media (hover: hover) { &:hover }");
  addVariant("group-hover", "@media (hover: hover) { :merge(.group):hover & }");
  addVariant("peer-hover", "@media (hover: hover) { :merge(.peer):hover ~ & }");

  // Unchanged from the default, but needed to redefine so it's ordered after
  // :hover in the CSS and therefore takes precedence when it applies.
  addVariant("active", "&:active");
  addVariant("group-active", ":merge(.group):active &");
  addVariant("peer-active", ":merge(.peer):active ~ &");
});

export default {
  content: ["./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    // Same as default Tailwind breakpoints, but defined in rem units.
    // Note: This is fixed in Tailwind 4.0, so we can remove it then!
    screens: {
      xs: "21.875rem",
      sm: "40rem",
      md: "48rem",
      lg: "64rem",
      xl: "80rem",
      "2xl": "96rem",
    },
    extend: {
      gridTemplateColumns: {
        center: "0px 1fr 0px",
        "center-lg": "1fr 64rem 1fr",
      },
      colors: {
        disruption: "oklch(65% 0.23 35)", // #FC4000
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  corePlugins: {
    // Disable the default `leading-*` utilities, so the override plugin works.
    lineHeight: false,
  },
  plugins: [lineHeightOverridePlugin, touchFriendlyHoverPlugin],
} satisfies Config;
