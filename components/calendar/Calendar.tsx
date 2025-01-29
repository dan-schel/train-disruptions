import React from "react";
import clsx from "clsx";
import {
  addDays,
  differenceInCalendarDays,
  eachMonthOfInterval,
  format,
  getDaysInMonth,
  isToday,
} from "date-fns";

import { Grid } from "../core/Grid";
import { Column } from "../core/Column";
import { Text } from "../core/Text";
import { daysInWeek } from "date-fns/constants";
import { range } from "@dan-schel/js-utils";
import { Row } from "../core/Row";
import {
  maxDates,
  disruption,
  column,
  isInitial,
  getRange,
  isThereDisruption,
} from "./utils";

// Dumbed down version for debugging
export type Disruption = {
  from: Date;
  to: Date;
  evenings: boolean;
};

type Props = {
  disruptions: Disruption[];
  glance?: boolean; // Look up to the next 4 weeks
};

export function Calendar(props: Props) {
  const { startDate, endDate } = getRange(props.disruptions);
  const datesToRender = props.glance
    ? maxDates - startDate.getDay()
    : differenceInCalendarDays(endDate, startDate) + // Get days to between the two dates
      (daysInWeek - endDate.getDay()); // Pad with additional dates to fill out the rest of the row

  const months = eachMonthOfInterval({
    start: startDate,
    end: props.glance ? addDays(startDate, datesToRender) : endDate,
  })
    .map((date, i) => {
      return {
        start: isInitial(i) ? startDate : date,
        days:
          getDaysInMonth(date) - (isInitial(i) ? startDate.getDate() - 1 : 0), // Gets days in the month, removes dates in the past
      };
    })
    .map((x, i, a) => ({
      ...x,
      days: Math.min(
        x.days,
        datesToRender -
          a.slice(0, i).reduce((prev, curr) => prev + curr.days, 0), // Dates consumed by the previous months
      ),
    }));

  return (
    <>
      <Column className="gap-4">
        {months.map(({ start, days }, i) => (
          <Column key={i} className="gap-1">
            {/* Month Year */}
            <Text align="center" style="custom" className="text-sm">
              {format(start, "MMMM yyyy")}
            </Text>

            {/* Today indicator */}
            {isToday(start) && (
              <Grid
                columns="repeat(7, minmax(0, 1fr))"
                className="w-full gap-1"
              >
                <div
                  className={clsx("relative grid bg-black py-1", column(start))}
                >
                  <Text
                    oneLine
                    style="custom"
                    className="text-xs font-medium text-white"
                    align="center"
                  >
                    TODAY
                  </Text>
                  <div className="absolute -bottom-2 h-0 w-0 place-self-center border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-black" />
                </div>
              </Grid>
            )}

            {/* Calendar */}
            <Grid columns="repeat(7, minmax(0, 1fr))" className="w-full gap-1">
              {range(0, days).map((day) => (
                <div
                  key={day}
                  className={clsx(
                    "grid h-8 items-center justify-center",
                    isInitial(day) && column(start),
                    isThereDisruption(addDays(start, day), props.disruptions),
                  )}
                >
                  {addDays(start, day).getDate()}
                </div>
              ))}
            </Grid>
          </Column>
        ))}

        {/* Legends */}
        <Row className="gap-4">
          <div className="flex items-center gap-2">
            <div className={clsx("size-4", disruption["buses"])} />
            <Text oneLine style="custom" className="text-xs">
              All day
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <div className={clsx("size-4", disruption["night"])} />
            <Text oneLine style="custom" className="text-xs">
              Evening only
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <div className={clsx("size-4", disruption["trains"])} />
            <Text oneLine style="custom" className="text-xs">
              Trains
            </Text>
          </div>
        </Row>
      </Column>
    </>
  );
}
