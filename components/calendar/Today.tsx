import clsx from "clsx";
import React from "react";
import { isThisWeek, isPast, isToday } from "date-fns";

import { Grid } from "../core/Grid";
import { Text } from "../core/Text";

import { column } from "./utils";

type Props = {
  start: Date;
};

export const TodayIndicator = ({ start }: Props) => {
  if (isThisWeek(start) && (!isPast(start) || isToday(start)))
    return (
      <Grid key={"today"} columns="repeat(7, minmax(0, 1fr))" className="gap-1">
        <div
          className={clsx(
            "relative z-10 grid bg-black py-1",
            column(new Date()),
          )}
        >
          <Text
            oneLine
            style="custom"
            className="text-xs font-medium text-white max-xs:text-[10px] lg:text-base"
            align="center"
          >
            TODAY
          </Text>

          {/* Triangle */}
          <div
            className={
              "absolute -bottom-2 -z-10 size-4 rotate-45 place-self-center bg-black lg:-bottom-3 lg:size-6"
            }
          />
        </div>
      </Grid>
    );

  return null;
};
