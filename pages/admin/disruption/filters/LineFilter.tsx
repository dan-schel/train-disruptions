import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Switch } from "@/components/common/Switch";

type LineFilterProps = {
  lines: { name: string; id: number; lineGroup: "suburban" | "regional" }[];
  selected: number[];
  setSelected: (
    group: "suburban" | "regional",
    checked: boolean,
    line?: number,
  ) => void;
  suburban: boolean;
  regional: boolean;
};

export function LineFilter(props: LineFilterProps) {
  const { lines, selected, setSelected, suburban, regional } = props;

  return (
    <Column className="gap-4">
      <Text style="subtitle">Lines</Text>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-8">
        <Column className="gap-3">
          <Switch
            checked={suburban}
            onChange={(checked) => setSelected("suburban", checked)}
          >
            <Text>
              <strong>Suburban</strong>
            </Text>
          </Switch>

          {lines
            .filter((line) => line.lineGroup === "suburban")
            .map((line) => (
              <Switch
                checked={selected.includes(line.id)}
                onChange={(checked) =>
                  setSelected("suburban", checked, line.id)
                }
                key={line.id}
              >
                <Text style="small">{line.name}</Text>
              </Switch>
            ))}
        </Column>

        <Column className="gap-3">
          <Switch
            checked={regional}
            onChange={(checked) => setSelected("regional", checked)}
          >
            <Text>
              <strong>Regional</strong>
            </Text>
          </Switch>

          {lines
            .filter((line) => line.lineGroup === "regional")
            .map((line) => (
              <Switch
                checked={selected.includes(line.id)}
                onChange={(checked) =>
                  setSelected("regional", checked, line.id)
                }
                key={line.id}
              >
                <Text style="small">{line.name}</Text>
              </Switch>
            ))}
        </Column>
      </div>
    </Column>
  );
}
