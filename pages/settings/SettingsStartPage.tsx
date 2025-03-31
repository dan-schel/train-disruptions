import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Startpage, startPages } from "@/shared/settings";
import { useSettings } from "@/hooks/useSettings";
import { SettingsRadioButton } from "@/components/settings/SettingsRadioButton";

const formattedOptions: Record<(typeof startPages)[number], string> = {
  overview: "Overview",
  commute: "My Commute",
};

export function SettingsStartPage() {
  const [settings, setSettings] = useSettings();

  function updateStart(option: Startpage) {
    setSettings(settings.with({ startPage: option }));
  }

  return (
    <Column className="gap-4">
      <Text style="subtitle">Start page</Text>
      {startPages.map((option) => (
        <SettingsRadioButton
          key={option}
          title={formattedOptions[option]}
          group="start-page"
          checked={(settings.startPage as string).includes(option)}
          onChange={() => updateStart(option)}
        />
      ))}
    </Column>
  );
}
