import React from "react";
import { BusReplacement as BusReplacementProps } from "./+data";

import { Map } from "../../../components/map/Map";
import { Text } from "../../../components/core/Text";
import { Link } from "../../../components/core/Link";
import { Column } from "../../../components/core/Column";
import { Calendar } from "../../../components/calendar/Calendar";

export function BusReplacement(props: BusReplacementProps) {
  const { title, description, disruption, link } = props;
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

      {/* TODO: Show the sections of the track affected */}
      <Map />
    </Column>
  );
}
