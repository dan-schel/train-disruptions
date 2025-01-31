import clsx from "clsx";
import React from "react";
import { range } from "@dan-schel/js-utils";
import { addDays, format, isThisWeek, isToday } from "date-fns";

import { Row } from "../core/Row";
import { Grid } from "../core/Grid";
import { Text } from "../core/Text";
import { Column } from "../core/Column";
import {
  disruption,
  column,
  isInitial,
  isThereDisruption,
  getMonthsToRender,
} from "./utils";

// TODO: Dumbed down version for debugging, would need to be changed to what's stored on the database
export type Disruption = {
  from: Date;
  to: Date;
  evenings: boolean;
};

type Props = {
  disruptions: Disruption | Disruption[];
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
export function Calendar({ disruptions }: Props) {
  return (
    <Column className="gap-4">
      {getMonthsToRender(disruptions).map(({ start, days }, i) => (
        <Column key={i} className="gap-2">
          {/* Month Year */}
          <Text align="center" style="custom" className="text-sm lg:text-base">
            {format(start, "MMMM yyyy")}
          </Text>

          <Column className="gap-1">
            {/* Today indicator */}
            {isThisWeek(start) &&
              range(0, days).map((day) =>
                isToday(addDays(start, day)) ? (
                  <Grid
                    key={"today"}
                    columns="repeat(7, minmax(0, 1fr))"
                    className="w-full gap-1"
                  >
                    <div
                      className={clsx(
                        "relative z-10 grid bg-black py-1",
                        column(addDays(start, day)),
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
                ) : null,
              )}

            {/* Calendar */}
            <Grid columns="repeat(7, minmax(0, 1fr))" className="w-full gap-1">
              {range(0, days).map((day) => (
                <div
                  key={day}
                  className={clsx(
                    "grid h-8 items-center justify-center lg:h-12",
                    isInitial(day) && column(start),
                    isThereDisruption(addDays(start, day), disruptions),
                  )}
                >
                  {addDays(start, day).getDate()}
                </div>
              ))}
            </Grid>
          </Column>
        </Column>
      ))}

      {/* Legends */}
      <Row className="gap-4">
        <div className="flex items-center gap-2">
          <div className={clsx("size-4 lg:size-6", disruption["buses"])} />
          <Text oneLine style="custom" className="text-xs lg:text-sm">
            All day
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <div className={clsx("size-4 lg:size-6", disruption["night"])} />
          <Text oneLine style="custom" className="text-xs lg:text-sm">
            Evening only
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <div className={clsx("size-4 lg:size-6", disruption["trains"])} />
          <Text oneLine style="custom" className="text-xs lg:text-sm">
            Trains
          </Text>
        </div>
      </Row>
    </Column>
  );
}
