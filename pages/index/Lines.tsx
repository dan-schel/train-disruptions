import React from "react";

import { LineButton } from "./LineButton";
import { Text } from "../../components/core/Text";
import { Line } from "../../server/data/static/line";
import { Column } from "../../components/core/Column";

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
      <Column className="divide-y-1 divide-slate-200">
        {props.lines.map((line) => (
          <LineButton key={line.id} line={line} status={getRandomStatus()} />
        ))}
      </Column>
    </Column>
  );
}

// For visualisation only
function getRandomStatus() {
  const random = Math.random() * 10;

  if (random < 5) return "clear";
  if (random < 8) return "delays";
  return "buses";
}
