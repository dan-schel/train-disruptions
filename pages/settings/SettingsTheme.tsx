import React from "react";

import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";

const themeOptions = ["system", "light", "dark"] as const;

const formattedTheme: Record<
  (typeof themeOptions)[number],
  { name: string; value?: string }
> = {
  system: {
    name: "Auto",
    value: "system",
  },
  light: {
    name: "Light",
    value: "light",
  },
  dark: {
    name: "Dark",
    value: "dark",
  },
};

export function SettingsTheme() {
  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Colour theme
      </Text>
      <Spacer h="2" />

      <Column>
        {themeOptions.map((options) => (
          <label
            key={options}
            className="flex cursor-pointer gap-2 hover:bg-gray-200"
          >
            <input
              type="radio"
              name="theme"
              value={formattedTheme[options].value}
            />
            {formattedTheme[options].name}
          </label>
        ))}
      </Column>
    </Column>
  );
}
