import React from "react";
import { range } from "@dan-schel/js-utils";
import { daysInWeek } from "date-fns/constants";
import { format, addDays, startOfISOWeek } from "date-fns";

import { Grid } from "../core/Grid";

export const DaysOfTheWeek = () => {
  return (
    <Grid columns="repeat(7, minmax(0, 1fr))" className="gap-1">
      {range(0, daysInWeek).map((date) => (
        <div key={date} className="flex items-center justify-center text-xs">
          {format(addDays(startOfISOWeek(new Date()), date), "EEEEE")}
        </div>
      ))}
    </Grid>
  );
};
