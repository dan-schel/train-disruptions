import clsx from "clsx";
import React from "react";
import { addDays } from "date-fns";
import { range } from "@dan-schel/js-utils";

import { Grid } from "../core/Grid";
import { Text } from "../core/Text";
import { Disruption } from "./Calendar";

import { isInitial, column, isThereDisruption } from "./utils";

type Props = {
  start: Date;
  days: number;
  disruptions: Disruption | Disruption[];
};

export const CalendarGrid = ({ start, days, disruptions }: Props) => {
  return (
    <Grid columns="repeat(7, minmax(0, 1fr))" className="gap-1">
      {range(0, days).map((day) => (
        <div
          key={day}
          className={clsx(
            "flex h-8 items-center justify-center md:h-12",
            isInitial(day) && column(start),
            isThereDisruption(addDays(start, day), disruptions),
          )}
        >
          <Text>{addDays(start, day).getDate()}</Text>
        </div>
      ))}
    </Grid>
  );
};
