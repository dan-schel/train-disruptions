import React from "react";

import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";
import { Settings } from "../../shared/settings";

export type HomepageProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const homepageOptions = ["overview", "commute"] as const;

const formattedHomepage: Record<
  (typeof homepageOptions)[number],
  { name: string; value?: string; default?: undefined | number }
> = {
  overview: {
    name: "Overview",
    value: "overview",
    default: undefined,
  },
  commute: {
    name: "My Commute",
    value: "commute",
    default: 0,
  },
};

export function SettingsHome({ settings }: HomepageProps) {
  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Start page
      </Text>
      <Spacer h="2" />

      <Column>
        {homepageOptions.map((options) => (
          <label key={options} className="flex gap-2 hover:bg-gray-200">
            <input
              type="radio"
              name="start-page"
              value={formattedHomepage[options].value}
              defaultChecked={
                // used for only initial render -> resetting cookies does not update instantly (requires reload ATM)
                typeof settings.commute?.a ===
                typeof formattedHomepage[options].default
              }
            />
            {formattedHomepage[options].name}
          </label>
        ))}
      </Column>
    </Column>
  );
}
