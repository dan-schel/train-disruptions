import { Theme, themes } from "@/shared/settings";

export function applyTheme(theme: Theme) {
  themes.forEach((x) => {
    document.documentElement.classList.toggle(x, theme === x);
  });

  // Update status bar theme for PWA
  document.querySelectorAll("meta[name=theme-color]").forEach((meta) => {
    const colour =
      theme === "system"
        ? meta.getAttribute("media") === "(prefers-color-scheme: light)"
          ? "#ffffff"
          : "#121212"
        : window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("--color-background");
    meta.setAttribute("content", colour);
  });
}
