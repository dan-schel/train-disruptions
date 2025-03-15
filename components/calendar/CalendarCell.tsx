import React from "react";

import { With } from "@/components/core/With";
import { Text } from "@/components/core/Text";
import { RenderedCalendarMark } from "@/shared/types/calendar-marks";
import { Column } from "@/components/core/Column";
import { dateBoxStyles, getColumn } from "@/components/calendar/utils";
import clsx from "clsx";

export type CalendarCellProps = {
  date: RenderedCalendarMark;
};

export function CalendarCell({ date }: CalendarCellProps) {
  return (
    <With gridColumn={getColumn(date)}>
      <Column
        align="center"
        justify="center"
        className={clsx("aspect-[4/3]", dateBoxStyles[date.mark])}
      >
        <Text align="center">{date.day}</Text>
      </Column>
    </With>
  );
}
