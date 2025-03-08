import { parseIntNull } from "@dan-schel/js-utils";
import { PageContext } from "vike/types";
import { StationCollection } from "../../server/data/static/station-collection";
import { Station } from "../../server/data/static/station";
import { Settings } from "../../shared/settings";
import { JsonSerializable } from "../../shared/json-serializable";

export type ChooseData = {
  type: "choose";
  stations: {
    id: number;
    name: string;
  }[];
};

export type DisplayData = {
  type: "display";
  stationA: {
    id: number;
    name: string;
  };
  stationB: {
    id: number;
    name: string;
  };
  isCurrentCommute: boolean;
};

export type Data = ChooseData | DisplayData;

export function data(pageContext: PageContext): Data & JsonSerializable {
  const { app, settings } = pageContext.custom;
  const to = tryGetStation(app.stations, pageContext.urlParsed.search.to);
  const from = tryGetStation(app.stations, pageContext.urlParsed.search.from);

  // Show the choose page if ?to=X&from=Y is not provided or invalid in any way.
  if (to == null || from == null || to.id === from.id) {
    return {
      type: "choose",
      stations: app.stations
        .all()
        .map((s) => ({ id: s.id, name: s.name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    };
  } else {
    return {
      type: "display",
      stationA: { id: from.id, name: from.name },
      stationB: { id: to.id, name: to.name },
      isCurrentCommute: isCurrentCommute(settings, from, to),
      // TODO: Fetch the disruptions impacting this trip!
    };
  }
}

function tryGetStation(
  stations: StationCollection,
  idStr: string | null | undefined,
): Station | null {
  if (idStr == null) {
    return null;
  }

  const id = parseIntNull(idStr);
  if (id == null) {
    return null;
  }

  return stations.get(id);
}

function isCurrentCommute(settings: Settings, from: Station, to: Station) {
  if (settings.commute == null) {
    return false;
  }

  const stationAIncluded =
    settings.commute.a === from.id || settings.commute.a === to.id;
  const stationBIncluded =
    settings.commute.b === from.id || settings.commute.b === to.id;

  return stationAIncluded && stationBIncluded;
}
