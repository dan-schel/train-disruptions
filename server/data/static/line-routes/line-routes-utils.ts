import { LineRoute, LineRoutePath } from "./line-route";
import * as station from "../../../../shared/station-ids";

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
  return new LineRoute([new LineRoutePath([], stations)]);
}

export function loop(stations: number[]): LineRoute {
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

  return new LineRoute([
    new LineRoutePath(directStations, stations),
    new LineRoutePath(loopStations, stations),
  ]);
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
  return new LineRoute([
    new LineRoutePath([], [...shared, ...pathA, ...rejoined]),
    new LineRoutePath([], [...shared, ...pathB, ...rejoined]),
  ]);
}

export function regionalSimple({
  setDownOnly,
  stations,
}: {
  setDownOnly: number[];
  stations: number[];
}): LineRoute {
  return new LineRoute(
    setDownOnly.map((s) => new LineRoutePath([], [s, ...stations])),
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
  return new LineRoute(
    setDownOnly.flatMap((s) => [
      new LineRoutePath([], [s, ...shared, ...branchA]),
      new LineRoutePath([], [s, ...shared, ...branchB]),
    ]),
  );
}
