import React from "react";
import { AlteredRoute as AlteredRouteProps } from "./+data";

import { Map } from "../../../components/map/Map";
import { Text } from "../../../components/core/Text";
import { Link } from "../../../components/core/Link";
import { With } from "../../../components/core/With";
import { Column } from "../../../components/core/Column";
import { Calendar } from "../../../components/calendar/Calendar";

export function AlteredRoute(props: AlteredRouteProps) {
  const { title, description, link, disruption } = props;
  return (
    <Column className="gap-8">
      <Text style="title">{title}</Text>
      <Column className="gap-2">
        <Text>{description}</Text>
        <Link href={link} target="_blank">
          More info (ptv.vic.gov.au)
        </Link>
      </Column>

      <Calendar disruptions={disruption} />

      {/* TODO: Show the sections of the track affected or for this one, the inverse */}
      <With className="rounded-md border border-slate-200">
        <Map />
      </With>
    </Column>
  );
}
