import clsx from "clsx";
import React from "react";
import { toZonedTime } from "date-fns-tz";
import { getISODay, isSameMonth, isThisISOWeek } from "date-fns";

import { Grid } from "../core/Grid";
import { Text } from "../core/Text";

import { column, IANAMelbourneTimezone } from "./utils";

type Props = {
  date: Date;
};

export const TodayIndicator = ({ date }: Props) => {
  const currentDate = toZonedTime(new Date(), IANAMelbourneTimezone);

  if (
    isThisISOWeek(date) &&
    isSameMonth(date, currentDate) &&
    getISODay(currentDate) >= getISODay(date)
  )
    return (
      <Grid columns="repeat(7, minmax(0, 1fr))" className="gap-1">
        <div
          className={clsx(
            "bg-calendar-today-surface relative z-10 grid py-1",
            column(currentDate),
          )}
        >
          <Text
            oneLine
            style="custom"
            className="max-xs:text-[10px] text-calendar-today text-xs font-medium md:text-base"
            align="center"
          >
            TODAY
          </Text>

          {/* Triangle */}
          <div
            className={
              "bg-calendar-today-surface absolute top-2 -z-10 size-4 rotate-45 place-self-center md:size-5"
            }
          />
        </div>
      </Grid>
    );

  return null;
};
