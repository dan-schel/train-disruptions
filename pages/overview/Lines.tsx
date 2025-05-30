import React from "react";

import { LineButton } from "@/pages/overview/LineButton";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { OverviewPageLineData } from "@/shared/types/overview-page";

type LinesProps = {
  title: string;
  lines: OverviewPageLineData[];
};

export function Lines(props: LinesProps) {
  return (
    <Column className="gap-2">
      <Text style="subtitle">{props.title}</Text>
      <Column className="divide-soft-border divide-y-1">
        {props.lines.map((line) => (
          <LineButton key={line.id} line={line} />
        ))}
      </Column>
    </Column>
  );
}
