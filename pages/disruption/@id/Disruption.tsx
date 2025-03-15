import React from "react";
import { AlteredRoute as AlteredRouteProps } from "@/pages/disruption/@id/+data";
import { BusReplacement as BusReplacementProps } from "@/pages/disruption/@id/+data";
import { StationClosure as StationClosureProps } from "@/pages/disruption/@id/+data";

import { Map } from "@/components/map/Map";
import { Text } from "@/components/core/Text";
import { Link } from "@/components/core/Link";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";
import { Calendar } from "@/components/calendar/Calendar";

export function Disruption(
  props: StationClosureProps | AlteredRouteProps | BusReplacementProps,
) {
  const { title, description, link, calendarMarks } = props;
  return (
    <Column className="gap-8">
      <Text style="title">{title}</Text>
      <Column className="gap-2">
        <Text>{description}</Text>
        <Link href={link} target="_blank">
          More info (ptv.vic.gov.au)
        </Link>
      </Column>

      <Calendar marks={calendarMarks} />

      {/* TODO: For the future, use `type` from props to determine how we display the disruptions on the map, 
        e.g. station closures should show the location of the station, buses should show sections greyed out where affected - TBD */}
      <With className="border-action-secondary bg-surface-secondary rounded-md border">
        <Map />
      </With>
    </Column>
  );
}
