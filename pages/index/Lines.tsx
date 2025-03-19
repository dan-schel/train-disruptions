import React from "react";

import { LineButton } from "@/pages/index/LineButton";
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
      <Text style="custom" className="text-lg font-bold">
        {props.title}
      </Text>
      <Column className="divide-action-secondary divide-y-1">
        {props.lines.map((line) => (
          <LineButton key={line.id} line={line} />
        ))}
      </Column>
    </Column>
  );
}
