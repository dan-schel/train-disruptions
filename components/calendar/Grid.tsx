import React from "react";

import clsx from "clsx";
import { addDays } from "date-fns";
import { range } from "@dan-schel/js-utils";
import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { Disruption } from "@/components/calendar/Calendar";

import {
  isInitial,
  column,
  isThereDisruption,
} from "@/components/calendar/utils";
import {
  CalendarMark,
  RenderedCalendarMark,
} from "@/shared/types/calendar-marks";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";

export const markStyles: Record<CalendarMark, string> = {
  "no-disruption": "bg-gray-200 text-black",
  "evening-only": "bg-gray-200 border-3 border-disruption text-black",
  "all-day": "bg-disruption text-white",
};

export type CalendarGridProps = {
  dates: RenderedCalendarMark[];
  getColumn: (date: { year: number; month: number; day: number }) => number;
};

export const CalendarGrid = ({ dates, getColumn }: CalendarGridProps) => {
  return (
    <Grid columns="repeat(7, minmax(0, 1fr))" className="gap-1">
      {dates.map((date) => (
        <With gridColumn={getColumn(date).toFixed()} key={date.day}>
          <Column
            className={clsx("h-8 md:h-12", markStyles[date.mark])}
            align="center"
            justify="center"
          >
            <Text>{date.day.toFixed()}</Text>
          </Column>
        </With>
      ))}
    </Grid>
  );
};
