import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { DisplayTripPage } from "./DisplayTripPage";
import { ChooseTripPage } from "./ChooseTripPage";

/**
 * TODO: Handle scenarios where the query string doesn't correspond to a station.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const { toStation, fromStation, stations } = useData<Data>();

  if (toStation && fromStation) {
    return <DisplayTripPage toStation={toStation} fromStation={fromStation} />;
  } else {
    return (
      <ChooseTripPage
        toStation={toStation}
        fromStation={fromStation}
        stations={stations}
      />
    );
  }
}
