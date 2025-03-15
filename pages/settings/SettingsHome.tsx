import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { Settings, Startpage } from "@/shared/settings";

export type HomepageProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

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

export function SettingsHome({ settings, setSettings }: HomepageProps) {
  function updateStart(option: Startpage) {
    setSettings(settings.with({ startPage: option }));
  }

  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Start page
      </Text>
      <Spacer h="2" />

      <Column>
        {homepageOptions.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer gap-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <input
              type="radio"
              name="start-page"
              value={option}
              checked={(settings.startPage as string).includes(option)}
              onChange={() => updateStart(option)}
            />
            <Text>{formattedHomepage[option].name}</Text>
          </label>
        ))}
      </Column>
    </Column>
  );
}
