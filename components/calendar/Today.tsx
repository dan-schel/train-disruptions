import clsx from "clsx";
import React from "react";
import { isSameMonth, isThisISOWeek } from "date-fns";

import { Grid } from "../core/Grid";
import { Text } from "../core/Text";

import { column } from "./utils";

type Props = {
  date: Date;
};

export const TodayIndicator = ({ date }: Props) => {
  if (isThisISOWeek(date) && isSameMonth(date, new Date()))
    return (
      <Grid columns="repeat(7, minmax(0, 1fr))" className="gap-1">
        <div
          className={clsx(
            "relative z-10 grid bg-black py-1",
            column(new Date()),
          )}
        >
          <Text
            oneLine
            style="custom"
            className="text-xs font-medium text-white max-xs:text-[10px] md:text-base"
            align="center"
          >
            TODAY
          </Text>

          {/* Triangle */}
          <div
            className={
              "absolute top-2 -z-10 size-4 rotate-45 place-self-center bg-black md:size-5"
            }
          />
        </div>
      </Grid>
    );

  return null;
};
