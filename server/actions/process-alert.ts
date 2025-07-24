import { App } from "@/server/app";
import { Alert } from "@/server/data/alert";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { CustomDisruptionData } from "@/server/data/disruption/data/custom-disruption-data";
import { DelaysDisruptionData } from "@/server/data/disruption/data/delays-disruption-data";
import { DisruptionData } from "@/server/data/disruption/data/disruption-data";
import { NoCityLoopDisruptionData } from "@/server/data/disruption/data/no-city-loop-disruption-data";
import { StationClosureDisruptionData } from "@/server/data/disruption/data/station-closure-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import {
  HighlightedPoint,
  HighlightedSegment,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { Ends } from "@/server/data/disruption/period/ends/ends";
import { EndsAfterLastService } from "@/server/data/disruption/period/ends/ends-after-last-service";
import { EndsApproximately } from "@/server/data/disruption/period/ends/ends-approximately";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EndsNever } from "@/server/data/disruption/period/ends/ends-never";
import { EndsWhenAlertEnds } from "@/server/data/disruption/period/ends/ends-when-alert-ends";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { LineSection } from "@/server/data/line-section";
import { toLineShapeNode } from "@/server/data/line/line-routes/line-shape";
import { MapPoint } from "@/server/data/map-point";
import { MapSegment } from "@/server/data/map-segment";
import { RouteGraphAlternativeEdge } from "@/server/data/route-graph/edge/route-graph-alternative-edge";
import { RouteGraphEdge } from "@/server/data/route-graph/edge/route-graph-edge";
import { RouteGraphTrainEdge } from "@/server/data/route-graph/edge/route-graph-train-edge";
import { Range } from "@/server/data/utils/range";
import { ALERTS, DISRUPTIONS } from "@/server/database/models/models";
import { AlertProcessingInput } from "@/shared/schemas/alert-processing/alert-processing-input";
import {
  DisruptionDataInput,
  LineSectionInput,
} from "@/shared/schemas/alert-processing/disruption-data-input";
import {
  DisruptionPeriodInput,
  EndsInput,
} from "@/shared/schemas/alert-processing/disruption-period-input";
import { DisruptionWriteupInput } from "@/shared/schemas/alert-processing/disruption-writeup-input";
import { MapHighlightingInput } from "@/shared/schemas/alert-processing/map-highlighting-input";
import {
  RouteGraphEdgeInput,
  RouteGraphTrainEdgeInput,
} from "@/shared/schemas/alert-processing/route-graph-edge-input";
import { uuid } from "@dan-schel/js-utils";

type Result = { error: "not-found" | "already-processed" } | { success: true };
type ProcessingContext = { alert: Alert };

export async function processAlert(
  app: App,
  id: string,
  input: AlertProcessingInput,
): Promise<Result> {
  const alert = await app.database.of(ALERTS).get(id);
  if (alert == null) return { error: "not-found" };
  if (alert.getState() !== "new") return { error: "already-processed" };

  const ctx: ProcessingContext = { alert };

  // TODO: This whole action should be inside a DB transaction so we don't
  // create one disruption, fail to create a second, and then allow the user to
  // reprocess the alert with the first disruption still in the DB. The failure
  // should cause the first disruption created to be rolled-back (removed).

  for (const { data: dataInput, period: periodInput } of input) {
    const data = createData(dataInput);
    const period = createPeriod(ctx, periodInput);

    const disruption = new Disruption(
      uuid(),
      data,
      [alert.id],
      period,
      "manual",
    );
    await app.database.of(DISRUPTIONS).create(disruption);
  }

  await app.database.of(ALERTS).update(alert.processed());
  return { success: true };
}

// TODO: Can we avoid needing to do all the translation below?
//
// For the most part, it's doing the same work as the .translate() functions on
// the `bson` schemas for each of the classes, except for EndsWhenAlertEnds,
// because the frontend doesn't send along the current alert end time (it defers
// that responsibility to the backend).
//
// - I don't think the data classes themselves should handle this alert processing
//   specific logic (esp. with the ProcessingContext stuff).
//
// - I don't think the frontend code should work with the classes, most of the
//   code in there outside of the serialization/deserialization stuff would be
//   redundant, and unnecessarily bloat the JS bundle.
//
// - I don't think the frontend code should be responsible for filling in the
//   data for EndsWhenAlertEnds. In that sense, it makes sense that the data
//   received by the API here doesn't 1:1 match the data structure of these
//   backend classes.
//
// So what other options are there? :/

function createData(input: DisruptionDataInput): DisruptionData {
  switch (input.type) {
    case "bus-replacements":
      return new BusReplacementsDisruptionData(
        input.sections.map(createSection),
      );
    case "station-closure":
      return new StationClosureDisruptionData(input.stationId);
    case "delays":
      return new DelaysDisruptionData(
        input.stationId,
        input.delayInMinutes,
        input.sections.map(createSection),
      );
    case "no-city-loop":
      return new NoCityLoopDisruptionData(input.lineIds);
    case "custom":
      return new CustomDisruptionData(
        input.impactedLines,
        createWriteup(input.writeup),
        input.edgesToRemove.map(createRouteGraphTrainEdge),
        input.edgesToAdd.map(createRouteGraphEdge),
        createHighlighting(input.highlighting),
      );
  }
}

function createSection(input: LineSectionInput): LineSection {
  return new LineSection(
    input.line,
    toLineShapeNode(input.a),
    toLineShapeNode(input.b),
  );
}

function createWriteup(input: DisruptionWriteupInput): DisruptionWriteup {
  return new DisruptionWriteup(
    input.title,
    input.bodyMarkdown,
    input.summary,
    input.lineStatusIndicator,
  );
}

function createRouteGraphTrainEdge(
  input: RouteGraphTrainEdgeInput,
): RouteGraphTrainEdge {
  return new RouteGraphTrainEdge(
    input.stationA,
    input.stationB,
    input.line,
    input.isRegionalTrain,
  );
}

function createRouteGraphEdge(input: RouteGraphEdgeInput): RouteGraphEdge {
  switch (input.type) {
    case "train":
      return createRouteGraphTrainEdge(input);
    case "alternative":
      return new RouteGraphAlternativeEdge(
        input.stationA,
        input.stationB,
        input.mode,
      );
  }
}

function createHighlighting(input: MapHighlightingInput): MapHighlighting {
  return new MapHighlighting(
    input.segments.map(
      (x) =>
        new HighlightedSegment(
          new MapSegment(
            x.segment.mapNodeA,
            x.segment.mapNodeB,
            new Range(x.segment.percentage.min, x.segment.percentage.max),
          ),
          x.style,
        ),
    ),
    input.points.map(
      (x) =>
        new HighlightedPoint(
          new MapPoint(
            x.point.segmentANodeA,
            x.point.segmentANodeB,
            x.point.segmentBNodeA,
            x.point.segmentBNodeB,
            x.point.percentage,
          ),
          x.style,
        ),
    ),
  );
}

function createPeriod(
  ctx: ProcessingContext,
  input: DisruptionPeriodInput,
): DisruptionPeriod {
  switch (input.type) {
    case "standard":
      return new StandardDisruptionPeriod(
        input.start,
        createEnds(ctx, input.end),
      );
    case "evenings-only":
      return new EveningsOnlyDisruptionPeriod(
        input.start,
        createEnds(ctx, input.end),
        input.startHourEachDay,
      );
  }
}

function createEnds(ctx: ProcessingContext, input: EndsInput): Ends {
  switch (input.type) {
    case "ends-after-last-service":
      return new EndsAfterLastService(
        new JustDate(input.year, input.month, input.day),
      );
    case "ends-approximately":
      return new EndsApproximately(
        input.displayText,
        input.earliest,
        input.latest,
      );
    case "ends-exactly":
      return new EndsExactly(input.date);
    case "ends-never":
      return new EndsNever();
    case "ends-when-alert-ends":
      return new EndsWhenAlertEnds(ctx.alert.id, ctx.alert.latestData.endsAt);
  }
}
