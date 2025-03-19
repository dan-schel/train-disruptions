import React from "react";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { SimpleButton } from "@/components/common/SimpleButton";
import { PagePadding } from "@/components/common/PagePadding";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Spacer } from "@/components/core/Spacer";
import { MingcuteSearch2Line } from "@/components/icons/MingcureSearch2Line";
import { ChooseData } from "@/pages/trip/+data";

export type ChooseTripPageProps = {
  data: ChooseData;
};

type StationSelectProps = {
  id: string;
  label: string;
  stations: ChooseData["stations"];
};

export function ChooseTripPage(props: ChooseTripPageProps) {
  return (
    <Column>
      <BackNavigation name="Commute" href="/commute" />
      <PageCenterer>
        <PagePadding>
          <Column as="form" align="left">
            <Text style="title">Trip</Text>
            <Spacer h="4" />
            <StationSelect
              id="from"
              label="From:"
              stations={props.data.stations}
            />
            <Spacer h="4" />
            <StationSelect id="to" label="To:" stations={props.data.stations} />
            <Spacer h="8" />
            {/* TODO: Handle errors, e.g. entering the same station twice. */}
            <SimpleButton
              submit
              text="Go!"
              icon={<MingcuteSearch2Line />}
              theme="primary"
            />
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}

function StationSelect(props: StationSelectProps) {
  return (
    <Row className="gap-2">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        name={props.id}
        className="dark:bg-surface-secondary border-soft-border rounded border"
      >
        {props.stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    </Row>
  );
}
