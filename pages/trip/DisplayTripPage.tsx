import React from "react";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { BackNavigation } from "../../components/navigation/BackNavigation";
import { Station } from "../../server/data/station";

export type DisplayTripPageProps = {
  toStation: Station;
  fromStation: Station;
};

export function DisplayTripPage(props: DisplayTripPageProps) {
  return (
    <Column>
      <BackNavigation name="Trip" href="/trip" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            <Text style="title">Trip</Text>
            <Text>From: {props.fromStation.name}</Text>
            <Text>To: {props.toStation.name}</Text>
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
