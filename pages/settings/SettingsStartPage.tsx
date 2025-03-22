import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Startpage, startPages } from "@/shared/settings";
import { useSettings } from "@/hooks/useSettings";

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
    <Column>
      <Text style="custom" className="text-foreground-strong text-lg font-bold">
        Start page
      </Text>
      <Spacer h="2" />

      <Column>
        {startPages.map((option) => (
          <label
            key={option}
            className="hover:bg-soft-hover flex cursor-pointer gap-2 py-1"
          >
            <input
              type="radio"
              name="start-page"
              value={option}
              checked={(settings.startPage as string).includes(option)}
              onChange={() => updateStart(option)}
              className="accent-accent"
            />
            <Text>{formattedOptions[option]}</Text>
          </label>
        ))}
      </Column>
    </Column>
  );
}
