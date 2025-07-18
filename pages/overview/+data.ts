import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import {
  OverviewPageDisruptionSummary,
  OverviewPageLineData,
  OverviewPageLineStatusColor,
} from "@/shared/types/overview-page";
import { LineCollection } from "@/server/data/line/line-collection";
import { Disruption } from "@/server/data/disruption/disruption";
import {
  DisruptionWriteup,
  LineStatusIndicatorPriority,
} from "@/server/data/disruption/writeup/disruption-writeup";
import { Line } from "@/server/data/line/line";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { DisruptionSource } from "@/server/disruption-source/disruption-source";

const statusColorMapping: Record<
  LineStatusIndicatorPriority,
  OverviewPageLineStatusColor
> = {
  hidden: "green",
  "very-low": "yellow",
  low: "yellow",
  medium: "red",
  high: "red",
};

export type Data = {
  disruptions: OverviewPageDisruptionSummary[];
  suburban: OverviewPageLineData[];
  regional: OverviewPageLineData[];
  mapHighlighting: SerializedMapHighlighting;
};

type PreprocessedDisruption = {
  disruption: Disruption;
  lines: readonly number[];
  writeup: DisruptionWriteup;
  map: MapHighlighting;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;

  const disruptionSource = DisruptionSource.getInstance(app);

  const disruptions: PreprocessedDisruption[] = (
    await disruptionSource.listDisruptions({
      valid: true,
      period: app.time.now(),
    })
  ).map((x) => ({
    disruption: x,
    lines: x.data.getImpactedLines(app),
    writeup: x.data.getWriteupAuthor().write(app, x),
    map: x.data.getMapHighlighter().getHighlighting(app),
  }));

  return {
    disruptions: getSummaries(disruptions),
    ...getLines(app.lines, disruptions),
    mapHighlighting: MapHighlighting.serializeGroup(
      disruptions.map((x) => x.map),
    ),
  };
}

function getSummaries(
  disruptions: PreprocessedDisruption[],
): OverviewPageDisruptionSummary[] {
  return disruptions.map((x) => ({
    id: x.disruption.id,
    headline: x.writeup.summary.headline,
    subject: x.writeup.summary.subject,
    period: x.writeup.summary.period,
    icon: x.writeup.summary.iconType,
  }));
}

function getLines(
  lines: LineCollection,
  disruptions: PreprocessedDisruption[],
) {
  function populate(l: Line): OverviewPageLineData {
    const disruptionsThisLine = disruptions.filter(
      (d) =>
        d.lines.includes(l.id) &&
        d.writeup.lineStatusIndicator.priority !== "hidden",
    );

    if (disruptionsThisLine.length === 0) {
      return {
        id: l.id,
        name: l.name,
        status: "No reported disruptions",
        statusColor: "green",
      };
    }

    const highestPriority = DisruptionWriteup.ofHighestPriority(
      disruptionsThisLine.map((x) => x.writeup),
    );

    return {
      id: l.id,
      name: l.name,

      // When we have multiple disruptions tied for highest priority, we display
      // them comma separated.
      //
      // (TODO: Would be neat if we could somehow combine the display strings
      // together in a smarter way, e.g. "Middle Footscray station closed,
      // Ginifer station closed" is combined into "Middle Footscray and Ginifer
      // stations closed".)
      status: highestPriority
        .map((x) => x.lineStatusIndicator.summary)
        .join(", "),
      statusColor:
        statusColorMapping[highestPriority[0].lineStatusIndicator.priority],
    };
  }

  function byNameDesc(a: OverviewPageLineData, b: OverviewPageLineData) {
    return a.name.localeCompare(b.name);
  }

  return {
    suburban: lines
      .filter((l) => l.lineGroup === "suburban")
      .map(populate)
      .sort(byNameDesc),
    regional: lines
      .filter((l) => l.lineGroup === "regional")
      .map(populate)
      .sort(byNameDesc),
  };
}
