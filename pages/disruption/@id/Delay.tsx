import React from "react";
import { Delay as DelayProps } from "@/pages/disruption/@id/+data";

import { Map } from "@/components/map/Map";
import { Text } from "@/components/core/Text";
import { Link } from "@/components/core/Link";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";

export function Delay(props: DelayProps) {
  const { title, description, link } = props;
  return (
    <Column className="gap-8">
      <Text style="title">{title}</Text>
      <Column className="gap-2">
        <Text>{description}</Text>
        <Link href={link} target="_blank">
          More info (ptv.vic.gov.au)
        </Link>
      </Column>

      {/* TODO: Show the sections of the track affected */}
      <With className="rounded-md border border-slate-200">
        <Map />
      </With>
    </Column>
  );
}
