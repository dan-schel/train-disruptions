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
  function toggleHiddenCategory(category: FilterableDisruptionCategory) {
    if (settings.hiddenCategories.includes(category)) {
      setSettings(settings.withoutHiddenCategory(category));
    } else {
      setSettings(settings.withHiddenCategory(category));
    }
  }

  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Disruptions to show
      </Text>
      <Spacer h="2" />

      <Column className="gap-2">
        {allCategories.map((category) => (
          <label
            key={category}
            className="flex cursor-pointer items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <input
              type="checkbox"
              value={category}
              autoComplete="off"
              className="peer sr-only"
              checked={
                (settings.hiddenCategories as string[]).includes(category) ||
                formattedCategories[category].disabled === true
              }
              disabled={formattedCategories[category].disabled}
              onChange={
                category !== "essential"
                  ? () => toggleHiddenCategory(category)
                  : undefined
              }
            />
            <Column>
              {formattedCategories[category].name}
              {formattedCategories[category].description && (
                <Text style="custom" className="text-sm">
                  {formattedCategories[category].description}
                </Text>
              )}
            </Column>
            {formattedCategories[category].disabled === true ? (
              <>
                <div className="peer relative h-5 w-9 rounded-full bg-gray-200 opacity-50 transition-all duration-500 ease-in-out peer-checked:bg-blue-600 peer-focus:ring-transparent peer-focus:outline-0 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
              </>
            ) : (
              <>
                <div className="peer relative h-5 w-9 rounded-full bg-gray-400 transition-all duration-500 ease-in-out peer-checked:bg-blue-600 peer-focus:ring-transparent peer-focus:outline-0 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white hover:bg-blue-400 hover:peer-checked:bg-blue-500" />
              </>
            )}
          </label>
        ))}
      </Column>
    </Column>
  );
}
