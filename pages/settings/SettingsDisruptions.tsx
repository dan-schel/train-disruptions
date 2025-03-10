import React from "react";

// import { useState } from "react";
import { Column } from "../../components/core/Column";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";
import {
  filterableDisruptionCategories,
  FilterableDisruptionCategory,
  Settings,
} from "../../shared/settings";

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
          <Row key={category} className="gap-2">
            <input
              type="checkbox"
              value={category}
              checked={
                (settings.hiddenCategories as string[]).includes(category) ||
                formattedCategories[category].disabled
              }
              disabled={formattedCategories[category].disabled}
              onChange={
                category !== "essential"
                  ? () => toggleHiddenCategory(category)
                  : undefined
              }
            />
            <Column>
              <label htmlFor="essential-check">
                {formattedCategories[category].name}
              </label>
              {formattedCategories[category].description && (
                <Text style="custom" className="text-sm">
                  {formattedCategories[category].description}
                </Text>
              )}
            </Column>
          </Row>
        ))}
      </Column>
    </Column>
  );
}
