import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Theme } from "@/shared/settings";
import { useSettings } from "@/components/SettingsProvider";

const themeOptions = ["system", "light", "dark"] as const;

const formattedTheme: Record<(typeof themeOptions)[number], { name: string }> =
  {
    system: {
      name: "Auto",
    },
    light: {
      name: "Light",
    },
    dark: {
      name: "Dark",
    },
  };

export function SettingsTheme() {
  const [settings, setSettings] = useSettings();

  function updateTheme(theme: Theme) {
    setSettings(settings.with({ theme: theme }));
    document.documentElement.className = theme;

    // Update status bar theme for PWA
    document.querySelectorAll("meta[name=theme-color]").forEach((meta) => {
      const colour =
        theme === "system"
          ? meta.getAttribute("media") === "(prefers-color-scheme: light)"
            ? "#ffffff"
            : "#121212"
          : window
              .getComputedStyle(document.documentElement)
              .getPropertyValue("--color-surface");
      meta.setAttribute("content", colour);
    });
  }

  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Colour theme
      </Text>
      <Spacer h="2" />
      <Column>
        {themeOptions.map((theme) => (
          <label
            key={theme}
            className="flex cursor-pointer gap-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={(settings.theme as string).includes(theme)}
              onChange={() => updateTheme(theme)}
            />
            <Text>{formattedTheme[theme].name}</Text>
          </label>
        ))}
      </Column>
    </Column>
  );
}
