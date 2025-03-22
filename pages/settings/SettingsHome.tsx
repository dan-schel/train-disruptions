import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Startpage } from "@/shared/settings";
import { useSettings } from "@/components/SettingsProvider";

const homepageOptions = ["overview", "commute"] as const;

const formattedHomepage: Record<
  (typeof homepageOptions)[number],
  { name: string }
> = {
  overview: {
    name: "Overview",
  },
  commute: {
    name: "My Commute",
  },
};

export function SettingsHome() {
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
        {homepageOptions.map((option) => (
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
            <Text>{formattedHomepage[option].name}</Text>
          </label>
        ))}
      </Column>
    </Column>
  );
}
