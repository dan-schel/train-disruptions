import { LineRoute } from "./line-route";
import * as station from "../../../../shared/station-ids";
import {
  CanonicalLineShape,
  CanonicalLineShapeEdge,
} from "./canonical-line-shape";
import { StationPair } from "./station-pair";
import { itsOk } from "@dan-schel/js-utils";

const directWestern = [station.FLINDERS_STREET, station.SOUTHERN_CROSS];
const directEastern = [station.FLINDERS_STREET];
const loopEastern = [
  station.FLINDERS_STREET,
  station.SOUTHERN_CROSS,
  station.FLAGSTAFF,
  station.MELBOURNE_CENTRAL,
  station.PARLIAMENT,
];
const loopWestern = [
  station.FLINDERS_STREET,
  station.PARLIAMENT,
  station.MELBOURNE_CENTRAL,
  station.FLAGSTAFF,
];

export function simple(stations: number[]): LineRoute {
  throwUnlessMinNumber(stations, 2, "Simple", "stations");

  const firstStation = stations[0];
  const edges = pairAdjacentStations(stations).map(toSimpleCanonicalEdge);
  return new LineRoute(new CanonicalLineShape(firstStation, edges));
}

export function loop(stations: number[]): LineRoute {
  throwUnlessMinNumber(stations, 1, "Loop", "stations");

  const portal = stations[0];

  const directStations = {
    [station.NORTH_MELBOURNE]: directWestern,
    [station.RICHMOND]: directEastern,
    [station.JOLIMONT]: directEastern,
  }[portal];

  const loopStations = {
    [station.NORTH_MELBOURNE]: loopWestern,
    [station.RICHMOND]: loopEastern,
    [station.JOLIMONT]: loopEastern,
  }[portal];

  if (directStations == null || loopStations == null) {
    throw new Error(`Invalid loop portal station: ${portal}.`);
  }

  const normalEdges = pairAdjacentStations(stations).map(toSimpleCanonicalEdge);

  const theCityEdge = new CanonicalLineShapeEdge("the-city", portal, [
    ...pairAdjacentStations([...directStations, portal]).map(toRouteGraphPair),
    ...pairAdjacentStations([...loopStations, portal]).map(toRouteGraphPair),
  ]);

  return new LineRoute(
    new CanonicalLineShape("the-city", [theCityEdge, ...normalEdges]),
  );
}

export function dualPath({
  shared,
  pathA,
  pathB,
  rejoined,
}: {
  shared: number[];
  pathA: number[];
  pathB: number[];
  rejoined: number[];
}): LineRoute {
  throwUnlessMinNumber(shared, 1, "Dual path", "shared");
  throwUnlessMinNumber(rejoined, 1, "Dual path", "rejoined");

  const firstStation = shared[0];

  const sharedNormalEdges = pairAdjacentStations(shared).map(
    toSimpleCanonicalEdge,
  );
  const rejoinedNormalEdges = pairAdjacentStations(rejoined).map(
    toSimpleCanonicalEdge,
  );

  const lastStationBeforeSplit = itsOk(shared.at(-1));
  const firstStationAfterRejoin = itsOk(rejoined.at(0));
  const pathASequence = [
    lastStationBeforeSplit,
    ...pathA,
    firstStationAfterRejoin,
  ];
  const pathBSequence = [
    lastStationBeforeSplit,
    ...pathB,
    firstStationAfterRejoin,
  ];

  const splitEdge = new CanonicalLineShapeEdge(
    lastStationBeforeSplit,
    firstStationAfterRejoin,
    [
      ...pairAdjacentStations(pathASequence).map(toRouteGraphPair),
      ...pairAdjacentStations(pathBSequence).map(toRouteGraphPair),
    ],
  );

  return new LineRoute(
    new CanonicalLineShape(firstStation, [
      ...sharedNormalEdges,
      splitEdge,
      ...rejoinedNormalEdges,
    ]),
  );
}

export function regionalSimple({
  setDownOnly,
  stations,
}: {
  setDownOnly: number[];
  stations: number[];
}): LineRoute {
  throwUnlessMinNumber(setDownOnly, 1, "Regional simple", "setDownOnly");
  throwUnlessMinNumber(stations, 1, "Regional simple", "stations");

  const firstStation = setDownOnly[0];
  const firstNormalStation = stations[0];

  const normalEdges = pairAdjacentStations(stations).map(toSimpleCanonicalEdge);
  const setDownOnlyEdges = toRegionalCanoncialEdge(
    setDownOnly,
    firstNormalStation,
  );

  return new LineRoute(
    new CanonicalLineShape(firstStation, [...setDownOnlyEdges, ...normalEdges]),
  );
}

export function regionalBranch({
  setDownOnly,
  shared,
  branchA,
  branchB,
}: {
  setDownOnly: number[];
  shared: number[];
  branchA: number[];
  branchB: number[];
}): LineRoute {
  throwUnlessMinNumber(setDownOnly, 1, "Regional branch", "setDownOnly");
  throwUnlessMinNumber(shared, 1, "Regional branch", "shared");
  throwUnlessMinNumber(branchA, 1, "Regional branch", "branchA");
  throwUnlessMinNumber(branchB, 1, "Regional branch", "branchB");

  const firstStation = itsOk(setDownOnly.at(0));
  const firstNormalStation = itsOk(shared.at(0));
  const lastStationBeforeBranch = itsOk(shared.at(-1));

  const setDownOnlyEdges = toRegionalCanoncialEdge(
    setDownOnly,
    firstNormalStation,
  );

  const normalEdges = pairAdjacentStations(shared).map(toSimpleCanonicalEdge);

  const branchAEdges = pairAdjacentStations([
    lastStationBeforeBranch,
    ...branchA,
  ]).map(toSimpleCanonicalEdge);

  const branchBEdges = pairAdjacentStations([
    lastStationBeforeBranch,
    ...branchB,
  ]).map(toSimpleCanonicalEdge);

  return new LineRoute(
    new CanonicalLineShape(firstStation, [
      ...setDownOnlyEdges,
      ...normalEdges,
      ...branchAEdges,
      ...branchBEdges,
    ]),
  );
}

function toRegionalCanoncialEdge(
  setDownOnly: number[],
  firstNormalStation: number,
) {
  const sdoRouteGraphPairs = setDownOnly.map(
    (x) => new StationPair(x, firstNormalStation),
  );

  return pairAdjacentStations([...setDownOnly, firstNormalStation]).map(
    (pair, i) => {
      return new CanonicalLineShapeEdge(
        pair.from,
        pair.to,
        sdoRouteGraphPairs.slice(0, i + 1),
      );
    },
  );
}

function pairAdjacentStations(stations: readonly number[]) {
  return stations
    .slice(0, -1)
    .map((_x, i) => ({ from: stations[i], to: stations[i + 1] }));
}

function toSimpleCanonicalEdge(pair: { from: number; to: number }) {
  return new CanonicalLineShapeEdge(pair.from, pair.to, [
    toRouteGraphPair(pair),
  ]);
}

function toRouteGraphPair(pair: { from: number; to: number }) {
  return new StationPair(pair.from, pair.to);
}

function throwUnlessMinNumber(
  stations: number[],
  min: number,
  routeType: string,
  arrayName: string,
) {
  if (stations.length < min) {
    throw new Error(
      `${routeType} routes must have at least ${min} ${min === 1 ? "station" : "stations"} in "${arrayName}".`,
    );
  }
}
