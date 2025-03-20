import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import {
  filterableDisruptionCategories,
  FilterableDisruptionCategory,
  Settings,
} from "@/shared/settings";

export type DisruptionSettingsProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const allCategories = ["essential", ...filterableDisruptionCategories] as const;

const formattedCategories: Record<
  (typeof allCategories)[number],
  { name: string; description?: string; disabled?: boolean }
> = {
  essential: {
    name: "Essential disruptions",
    description: "Buses replace trains, line closures",
    disabled: true,
  },
  "station-closures": {
    name: "Station closures",
  },
  cancellations: {
    name: "Cancellations",
  },
  delays: {
    name: "Delays",
  },
  "car-park-closures": {
    name: "Car park closures",
  },
  accessibility: {
    name: "Accessibility",
    description: "Lift outages, stair-only access, etc.",
  },
};

export function SettingsDisruptions({
  settings,
  setSettings,
}: DisruptionSettingsProps) {
  function toggleCategory(category: FilterableDisruptionCategory) {
    if (settings.enabledCategories.includes(category)) {
      setSettings(settings.withoutEnabledCategories(category));
    } else {
      setSettings(settings.withEnabledCategories(category));
    }
  }

  return (
    <Column>
      <Text style="custom" className="text-foreground-strong text-lg font-bold">
        Disruptions to show
      </Text>
      <Spacer h="2" />

      <Column>
        {allCategories.map((category) => (
          <label
            key={category}
            className="hover:bg-soft-hover flex h-9 cursor-pointer items-center justify-between"
          >
            <input
              type="checkbox"
              value={category}
              autoComplete="off"
              className="peer sr-only"
              checked={
                (settings.enabledCategories as string[]).includes(category) ||
                formattedCategories[category].disabled === true
              }
              disabled={formattedCategories[category].disabled}
              onChange={
                category !== "essential"
                  ? () => toggleCategory(category)
                  : undefined
              }
            />
            <Column className="gap-1">
              <Text>{formattedCategories[category].name}</Text>
              {formattedCategories[category].description && (
                <Text style="custom" className="text-sm">
                  {formattedCategories[category].description}
                </Text>
              )}
            </Column>
            <div className="bg-switch peer-checked:bg-accent hover:bg-switch-hover hover:peer-checked:bg-accent-hover flex h-5 w-9 items-center rounded-full p-0.5 transition-transform ease-in-out peer-checked:*:translate-x-full peer-disabled:opacity-50">
              <div className="bg-switch-knob size-4 rounded-full transition-all" />
            </div>
          </label>
        ))}
      </Column>
    </Column>
  );
}
