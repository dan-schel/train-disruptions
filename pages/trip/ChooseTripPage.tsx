import React from "react";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";
import { PagePadding } from "../../components/common/PagePadding";
import { BackNavigation } from "../../components/navigation/BackNavigation";
import { Station } from "../../server/data/static/station";
import { Spacer } from "../../components/core/Spacer";
import { MingcuteSearch2Line } from "../../components/icons/MingcureSearch2Line";

export type ChooseTripPageProps = {
  toStation: Station | null;
  fromStation: Station | null;
  stations: Station[];
};

type StationSelectProps = {
  id: string;
  label: string;
  stations: Station[];
  defaultValue: Station | null;
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
              stations={props.stations}
              defaultValue={props.fromStation}
            />
            <Spacer h="4" />
            <StationSelect
              id="to"
              label="To:"
              stations={props.stations}
              defaultValue={props.toStation}
            />
            <Spacer h="8" />
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
        defaultValue={props.defaultValue?.id}
        className="border border-black"
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
