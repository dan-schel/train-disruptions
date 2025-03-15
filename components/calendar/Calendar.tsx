import React from "react";

import { Grid } from "@/components/core/Grid";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";

import { Legends } from "@/components/calendar/Legends";
import { MonthTitle } from "@/components/calendar/MonthTitle";
import { CalendarGrid } from "@/components/calendar/Grid";
import { DaysOfTheWeek } from "@/components/calendar/Days";
import { TodayIndicator } from "@/components/calendar/Today";
import { getMonthsToRender, isInitial } from "@/components/calendar/utils";
import { RenderedCalendarMark } from "@/shared/types/calendar-marks";
import { groupBy } from "@dan-schel/js-utils";

export type Disruption = {
  from: Date;
  to: Date;
  evenings: boolean;
};

type Props = {
  disruptions: Disruption | Disruption[];
  marks: RenderedCalendarMark[];
};

/**
 * React component to render disruptions in a calendar view.
 *
 * Accepts a `disruption` object or array of `disruptions`.
 *
 * An object should be provided if you want to only render calendar weeks in which a disruption is active.
 * _Useful for viewing a specific disruption_
 *
 * An array should be provided if you want to render disruptions across a period of 4 weeks from the current date (upto 28 days).
 * _Useful for having an overview for a specific line/trip_
 */
export function Calendar({ disruptions, marks }: Props) {
  const months = React.useMemo(
    () =>
      groupBy(marks, (x) => `${x.year}-${x.month}`).map((x, i) => ({
        key: x.group,
        year: x.items[0].year,
        month: x.items[0].month,
        isFirst: i === 0,
        startDate: new Date(
          x.items[0].year,
          x.items[0].month - 1,
          x.items[0].day,
        ),
        dates: x.items,
      })),
    [marks],
  );

  console.log(months);

  return (
    <Grid columns="auto minmax(auto, 48rem) auto">
      <With className="col-start-2">
        <Column className="gap-4">
          {months.map(({ key, year, month, isFirst, startDate, dates }) => (
            <Column key={key} className="gap-2">
              <MonthTitle year={year} month={month} />

              {isFirst && <DaysOfTheWeek />}

              <Column className="gap-1">
                <TodayIndicator date={startDate} />

                <CalendarGrid
                  disruptions={disruptions}
                  start={startDate}
                  days={dates.length}
                />
              </Column>
            </Column>
          ))}

          <Legends />
        </Column>
      </With>
    </Grid>
  );
}
