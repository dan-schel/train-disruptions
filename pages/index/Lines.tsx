import React from "react";
import { Line } from "@/pages/index/+data";

import { LineButton } from "@/pages/index/LineButton";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";

type LinesProps = {
  title: string;
  lines: Line[];
};

export function Lines(props: LinesProps) {
  return (
    <Column className="gap-2">
      <Text style="custom" className="text-lg font-bold">
        {props.title}
      </Text>
      <Column className="divide-action-secondary divide-y-1">
        {props.lines.map((line) => (
          <LineButton
            key={line.id}
            line={line}
            status={getRandomStatus(line)}
          />
        ))}
      </Column>
    </Column>
  );
}

// For visualisation only
function getRandomStatus(line: Line) {
  const random = (8 * line.id) % 10;

  if (random < 5) return "clear";
  if (random < 8) return "delays";
  return "buses";
}
