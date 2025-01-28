import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "./+data";

import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { SimpleButton } from "../../components/common/SimpleButton";
import { PagePadding } from "../../components/common/PagePadding";

/**
 * TODO: Handle scenarios where the query string doesn't correspond to a station.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const { toStation, fromStation, stations } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column className="gap-4">
          <Text style="title">Trip</Text>

          {toStation && fromStation ? (
            <>
              <Text>From: {fromStation.name}</Text>
              <Text>To: {toStation.name}</Text>
            </>
          ) : (
            <form className="flex flex-col gap-2">
              <Row className="gap-2">
                <label htmlFor="from">From:</label>
                <select
                  id="from"
                  name="from"
                  defaultValue={fromStation?.id}
                  className="border border-black"
                >
                  {stations.map((station) => (
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
                  defaultValue={toStation?.id}
                  className="border border-black"
                >
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </Row>

              <SimpleButton submit text="Go!" />
            </form>
          )}
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
