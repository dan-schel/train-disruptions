import React from "react";

import { Grid } from "../core/Grid";
import { With } from "../core/With";
import { Column } from "../core/Column";

import { Legends } from "./Legends";
import { MonthTitle } from "./Title";
import { CalendarGrid } from "./Grid";
import { DaysOfTheWeek } from "./Days";
import { TodayIndicator } from "./Today";
import { getMonthsToRender, isInitial } from "./utils";

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
    <Grid columns="auto minmax(auto, 48rem) auto">
      <With className="col-start-2">
        <Column className="gap-4">
          {getMonthsToRender(disruptions).map(({ start, days }, i) => (
            <Column key={start.getTime()} className="gap-2">
              <MonthTitle date={start} />

              {isInitial(i) && <DaysOfTheWeek />}

              <Column className="gap-1">
                <TodayIndicator date={start} />

                <CalendarGrid
                  disruptions={disruptions}
                  start={start}
                  days={days}
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
