import React from "react";

import { Grid } from "@/components/core/Grid";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";
import { Legend } from "@/components/calendar/Legend";
import { MonthTitle } from "@/components/calendar/MonthTitle";
import { CalendarCell } from "@/components/calendar/CalendarCell";
import { DaysOfTheWeek } from "@/components/calendar/DaysOfTheWeek";
import { TodayIndicator } from "@/components/calendar/TodayIndicator";
import { RenderedCalendarMark } from "@/shared/types/calendar-marks";
import { groupBy } from "@dan-schel/js-utils";
import { getColumn } from "@/components/calendar/utils";

export type CalendarProps = {
  marks: RenderedCalendarMark[];
};

/** Renders the given calendar marks in a calendar grid format. */
export function Calendar({ marks }: CalendarProps) {
  const months = React.useMemo(
    () =>
      groupBy(marks, (x) => `${x.year}-${x.month}`).map((x, i) => ({
        key: x.group,
        year: x.items[0].year,
        month: x.items[0].month,
        isFirst: i === 0,
        dates: x.items,
      })),
    [marks],
  );

  // TODO: We need to send today's date with the RenderedCalendarMarks. Maybe
  // RenderedCalendarMark[] becomes CalendarData, which includes today and the
  // marks?
  const today = marks[0];

  return (
    <Grid columns="auto minmax(auto, 32rem) auto">
      <With gridColumn="2">
        <Column className="gap-4">
          <Grid columns="repeat(7, 1fr)" className="gap-1">
            {months.map(({ key, year, month, isFirst, dates }) => (
              <React.Fragment key={key}>
                <MonthTitle year={year} month={month} />
                {isFirst && <DaysOfTheWeek />}
                {isFirst && sameDay(dates[0], today) && (
                  <TodayIndicator column={getColumn(today)} />
                )}
                {dates.map((date) => (
                  <CalendarCell key={date.day} date={date} />
                ))}
              </React.Fragment>
            ))}
          </Grid>
          <Legend />
        </Column>
      </With>
    </Grid>
  );
}

function sameDay(
  a: { year: number; month: number; day: number },
  b: { year: number; month: number; day: number },
) {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}
