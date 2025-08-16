import { Select } from "@/components/common/Select";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Column } from "@/components/core/Column";
import { Row } from "@/components/core/Row";
import { Spacer } from "@/components/core/Spacer";
import { MingcuteSettings7Line } from "@/components/icons/MingcuteSettings7Line";
import { PeriodFilter } from "@/pages/index/+data";
import { DisruptionSummary } from "@/shared/types/disruption";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { Map } from "@/components/map/Map";
import React from "react";
import { DisruptionButton } from "@/components/disruptions/DisruptionButton";
import { Text } from "@/components/core/Text";
import { Grid } from "@/components/core/Grid";

export type MapSectionProps = {
  disruptions: DisruptionSummary[];
  mapHighlighting: SerializedMapHighlighting;
  occuring: PeriodFilter;
};

export function MapSection(props: MapSectionProps) {
  return (
    <Column>
      <Grid columns="1fr auto">
        <Row align="center" className="min-w-0 shrink gap-1.5" wrap>
          <Text>Disruptions occuring</Text>
          <Select
            value={props.occuring}
            options={[
              { label: "right now", value: "now" },
              { label: "today", value: "today" },
              { label: "next 7 days", value: "week" },
            ]}
            onChange={(value) => {
              window.location.search = new URLSearchParams({
                occuring: value,
              }).toString();
            }}
          />
        </Row>
        <SimpleButton
          theme="hover"
          icon={<MingcuteSettings7Line />}
          alt="Settings"
          onClick={() => {}}
        />
      </Grid>
      <Spacer h="8" />

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
