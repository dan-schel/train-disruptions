import React from "react";
import { StationClosure as StationClosureProps } from "./+data";

import { Text } from "../../../components/core/Text";
import { Link } from "../../../components/core/Link";
import { Column } from "../../../components/core/Column";
import { Calendar } from "../../../components/calendar/Calendar";

export function StationClosure(props: StationClosureProps) {
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
    </Column>
  );
}
