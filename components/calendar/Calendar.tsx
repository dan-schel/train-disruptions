import React from "react";
import { format } from "date-fns";

import { Text } from "../core/Text";
import { Column } from "../core/Column";

import { Legends } from "./Legends";
import { CalendarGrid } from "./Grid";
import { TodayIndicator } from "./Today";
import { getMonthsToRender } from "./utils";

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
      {getMonthsToRender(disruptions).map(({ start, days }) => (
        <Column key={start.getTime()} className="gap-2">
          {/* Month Year */}
          <Text align="center" style="custom" className="text-sm lg:text-base">
            {format(start, "MMMM yyyy")}
          </Text>

          <Column className="gap-1">
            <TodayIndicator start={start} />

            <CalendarGrid disruptions={disruptions} start={start} days={days} />
          </Column>
        </Column>
      ))}

      <Legends />
    </Column>
  );
}
