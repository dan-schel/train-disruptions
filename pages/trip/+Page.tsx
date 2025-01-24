import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";

import { stations } from "../../server/data/stations";

/**
 * TODO: Handle scenarios where the query string doesn't correspond to a station.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const pageContext = usePageContext();

  // Query String
  const { to, from } = pageContext.urlParsed.search;

  return (
    <Column className="gap-4 p-4">
      <Text>Trip</Text>

      {to && from ? (
        <>
          <Text>From: {stations.get(parseInt(from))?.name}</Text>
          <Text>To: {stations.get(parseInt(to))?.name}</Text>
        </>
      ) : (
        <form className="flex flex-col gap-2">
          <Row className="gap-2">
            <label htmlFor="from">From:</label>
            <select
              id="from"
              name="from"
              defaultValue={from}
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
              defaultValue={to}
              className="border border-black"
            >
              {stations.map((station) => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </Row>

          <button type="submit" className="border border-black p-1">
            <Text align="center">Go!</Text>
          </button>
        </form>
      )}
    </Column>
  );
}
