import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Theme, themes } from "@/shared/settings";
import { applyTheme } from "@/pages/settings/utils";
import { useSettings } from "@/hooks/useSettings";
import { SettingsRadioButton } from "@/components/settings/SettingsRadioButton";

const titles: Record<(typeof themes)[number], string> = {
  system: "Auto",
  light: "Light",
  dark: "Dark",
};
const descriptions: Record<(typeof themes)[number], string | null> = {
  system: "Matches your device's/browser's settings.",
  light: null,
  dark: null,
};

export function SettingsTheme() {
  const [settings, setSettings] = useSettings();

  function updateTheme(theme: Theme) {
    setSettings(settings.with({ theme }));
    applyTheme(theme);
  }

  return (
    <Column className="gap-4">
      <Text style="subtitle">Colour theme</Text>
      {themes.map((theme) => (
        <SettingsRadioButton
          key={theme}
          title={titles[theme]}
          description={descriptions[theme] ?? undefined}
          group="theme"
          checked={(settings.theme as string).includes(theme)}
          onChange={() => updateTheme(theme)}
        />
      ))}
    </Column>
  );
}
