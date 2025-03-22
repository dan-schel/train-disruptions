import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Settings, Theme, themes } from "@/shared/settings";
import { applyTheme } from "@/pages/settings/utils";

const formattedTheme: Record<(typeof themes)[number], { name: string }> = {
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

export type SettingsResetProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export function SettingsTheme({ settings, setSettings }: SettingsResetProps) {
  function updateTheme(theme: Theme) {
    setSettings(settings.with({ theme }));
    applyTheme(theme);
  }

  return (
    <Column>
      <Text style="custom" className="text-foreground-strong text-lg font-bold">
        Colour theme
      </Text>
      <Spacer h="2" />
      <Column>
        {themes.map((theme) => (
          <label
            key={theme}
            className="hover:bg-soft-hover flex cursor-pointer gap-2 py-1"
          >
            <input
              type="radio"
              name="theme"
              value={theme}
              checked={(settings.theme as string).includes(theme)}
              onChange={() => updateTheme(theme)}
              className="accent-accent"
            />
            <Text>{formattedTheme[theme].name}</Text>
          </label>
        ))}
      </Column>
    </Column>
  );
}
