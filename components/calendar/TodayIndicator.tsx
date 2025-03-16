import React from "react";

import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";

export type TodayIndicatorProps = {
  column: number;
};

export function TodayIndicator({ column }: TodayIndicatorProps) {
  return (
    <With gridColumn={column}>
      <div className="relative h-4">
        <div className="bg-calendar-today absolute top-3 left-[50%] size-2 -translate-x-[50%] rotate-45" />
        <Column
          className="bg-calendar-today absolute left-[50%] h-4 -translate-x-[50%] px-2"
          align="center"
          justify="center"
        >
          <Text
            style="custom"
            className="text-calendar-on-today text-xs"
            align="center"
          >
            TODAY
          </Text>
        </Column>
      </div>
    </With>
  );
}
