import { App } from "@/server/app";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { NoCityLoopDisruptionData } from "@/server/data/disruption/data/no-city-loop-disruption-data";
import { StationClosureDisruptionData } from "@/server/data/disruption/data/station-closure-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import {
  dayStarts,
  localToUtcTime,
  utcToLocalTime,
} from "@/server/data/disruption/period/utils/utils";
import { seededRandom } from "@/server/data/disruption/seeded-random";
import { LineSection } from "@/server/data/line-section";
import { Line } from "@/server/data/line/line";
import { addDays, addHours, startOfDay } from "date-fns";

export function getDemoDisruptions(app: App): Disruption[] {
  // Uses a seeded random number generator to re-roll random disruptions every
  // day at midnight Melbourne time.
  const today = startOfDay(utcToLocalTime(app.time.now()));
  const rand = seededRandom(today.toISOString());

  const result: Disruption[] = [];

  for (const line of app.lines.all()) {
    const runsThroughCityLoop = line.route
      .getAllLineShapeNodes()
      .includes("the-city");
    const numDisruptions = randomInt(rand, 0, 3);
    for (let i = 0; i < numDisruptions; i++) {
      const disruptionType = randomChoice(
        rand,
        runsThroughCityLoop
          ? (["bus-replacement", "station-closure", "no-city-loop"] as const)
          : (["bus-replacement", "station-closure"] as const),
      );

      const disruptionId = (result.length + 1).toFixed();

      const disruption = {
        "bus-replacement": createBusReplacementsDisruption,
        "station-closure": createStationClosureDisruption,
        "no-city-loop": createNoCityLoopDiruption,
      }[disruptionType](rand, disruptionId, app, line, today);

      result.push(disruption);
    }
  }

  return result;
}

function createBusReplacementsDisruption(
  rand: () => number,
  id: string,
  _app: App,
  line: Line,
  today: Date,
): Disruption {
  const nodes = line.route.getAllLineShapeNodes();
  const a = randomChoice(rand, nodes);

  const nodesLeft = nodes.filter((n) => n !== a);
  const b = randomChoice(rand, nodesLeft);

  const section = new LineSection(line.id, a, b);

  return new Disruption(
    id,
    new BusReplacementsDisruptionData([section]),
    [],
    createDisruptionPeriod(rand, today),
  );
}

function createStationClosureDisruption(
  rand: () => number,
  id: string,
  _app: App,
  line: Line,
  today: Date,
): Disruption {
  const stations = line.route
    .getAllLineShapeNodes()
    .filter((node) => node !== "the-city");

  const station = randomChoice(rand, stations);

  return new Disruption(
    id,
    new StationClosureDisruptionData(station),
    [],
    createDisruptionPeriod(rand, today),
  );
}

function createNoCityLoopDiruption(
  rand: () => number,
  id: string,
  _app: App,
  line: Line,
  today: Date,
): Disruption {
  return new Disruption(
    id,
    new NoCityLoopDisruptionData([line.id]),
    [],
    createDisruptionPeriod(rand, today),
  );
}

function createDisruptionPeriod(
  rand: () => number,
  today: Date,
): DisruptionPeriod {
  const eveningsOnly = rand() < 0.33;

  const startDate = addDays(today, randomInt(rand, -7, 21));
  const endDate = addDays(startDate, randomInt(rand, 1, 10));

  const startHour = eveningsOnly
    ? randomInt(rand, 18, 21)
    : randomInt(rand, 3, 21);
  const endHour = eveningsOnly ? dayStarts : randomInt(rand, 3, 21);

  const start = localToUtcTime(addHours(startDate, startHour));
  const end = localToUtcTime(addHours(endDate, endHour));

  if (eveningsOnly) {
    return new EveningsOnlyDisruptionPeriod(
      start,
      new EndsExactly(end),
      startHour,
    );
  } else {
    return new StandardDisruptionPeriod(start, new EndsExactly(end));
  }
}

function randomInt(rand: () => number, min: number, max: number) {
  return Math.floor(rand() * (max - min + 1) + min);
}

function randomChoice<T>(rand: () => number, choices: readonly T[]): T {
  return choices[randomInt(rand, 0, choices.length - 1)];
}
