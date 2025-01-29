import React from "react";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";
import { PagePadding } from "../../components/common/PagePadding";
import { BackNavigation } from "../../components/navigation/BackNavigation";
import { Station } from "../../server/data/station";

export type ChooseTripPageProps = {
  toStation: Station | null;
  fromStation: Station | null;
  stations: Station[];
};

export function ChooseTripPage(props: ChooseTripPageProps) {
  return (
    <Column>
      <BackNavigation name="Commute" href="/commute" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            <Text style="title">Trip</Text>
            <form className="flex flex-col gap-2">
              <Row className="gap-2">
                <label htmlFor="from">From:</label>
                <select
                  id="from"
                  name="from"
                  defaultValue={props.fromStation?.id}
                  className="border border-black"
                >
                  {props.stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </Row>

              <Row className="gap-2">
                <label htmlFor="to">To:</label>
                <select
                  id="to"
                  name="to"
                  defaultValue={props.toStation?.id}
                  className="border border-black"
                >
                  {props.stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </Row>

              <SimpleButton submit text="Go!" />
            </form>
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
