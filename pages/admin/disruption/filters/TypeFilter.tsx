import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Switch } from "@/components/common/Switch";
import { DisruptionType } from "@/shared/types/disruption";

export const DisruptionTypes = [
  { label: "Bus replacements", key: "bus-replacements" },
  { label: "No city loop", key: "no-city-loop" },
  { label: "Station closures", key: "station-closure" },
  { label: "Delays", key: "delays" },
  { label: "Custom", key: "custom" },
] as const;

type TypeFilterProps = {
  types: DisruptionType[];
  onChange: (type: DisruptionType) => void;
};

export function TypeFilter({ types, onChange }: TypeFilterProps) {
  return (
    <Column className="gap-4">
      <Text style="subtitle">Disruption</Text>

      <Column className="gap-3">
        {DisruptionTypes.map(({ label, key }) => (
          <Switch
            key={key}
            checked={types.includes(key)}
            onChange={() => onChange(key)}
          >
            <Text style="small">{label}</Text>
          </Switch>
        ))}
      </Column>
    </Column>
  );
}
