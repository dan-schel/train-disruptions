import React from "react";

import { Column } from "@/components/core/Column";
import { Spacer } from "@/components/core/Spacer";
import { PeriodFilter } from "@/pages/index/+data";
import { DisruptionSummary } from "@/shared/types/disruption";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { Map } from "@/components/map/Map";
import { DisruptionButton } from "@/components/disruptions/DisruptionButton";

export type MapSectionProps = {
  disruptions: DisruptionSummary[];
  mapHighlighting: SerializedMapHighlighting;
  occuring: PeriodFilter;
};

export function MapSection(props: MapSectionProps) {
  return (
    <Column>
      <Map mode="show-disruptions" highlighting={props.mapHighlighting} />
      <Spacer h="2" />
      <Column className="-mx-4">
        {props.disruptions.map((x) => (
          <DisruptionButton key={x.id} data={x} />
        ))}
      </Column>
    </Column>
  );
}
