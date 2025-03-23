import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Theme, themes } from "@/shared/settings";
import { applyTheme } from "@/pages/settings/utils";
import { useSettings } from "@/hooks/useSettings";

const formattedTheme: Record<(typeof themes)[number], string> = {
  system: "Auto",
  light: "Light",
  dark: "Dark",
};

export function SettingsTheme() {
  const [settings, setSettings] = useSettings();

  function updateTheme(theme: Theme) {
    setSettings(settings.with({ theme }));
    applyTheme(theme);
  }

  return (
    <Column>
      <Text style="subtitle">Colour theme</Text>
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
            <Text>{formattedTheme[theme]}</Text>
          </label>
        ))}
      </Column>
    </Column>
  );
}
