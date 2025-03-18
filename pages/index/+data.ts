import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { OverviewPageLineData } from "@/shared/types/overview-page-line-data";
import { getDemoDisruptions } from "@/server/data/disruption/demo-disruptions";
import { LineCollection } from "@/server/data/line/line-collection";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { Line } from "@/server/data/line/line";

export type Data = {
  suburban: OverviewPageLineData[];
  regional: OverviewPageLineData[];
};

type PreprocessedDisruption = {
  disruption: Disruption;
  lines: readonly number[];
  writeup: DisruptionWriteup;
};

export function data(pageContext: PageContext): Data & JsonSerializable {
  const { app } = pageContext.custom;

  const disruptions: PreprocessedDisruption[] = getDemoDisruptions(app)
    .filter((x) => x.period.occursAt(app.time.now()))
    .map((x) => ({
      disruption: x,
      lines: x.data.getImpactedLines(app),
      writeup: x.data.getWriteupAuthor().write(app, x),
    }));

  return {
    ...getLines(app.lines, disruptions),
  };
}

function getLines(
  lines: LineCollection,
  disruptions: PreprocessedDisruption[],
) {
  function populate(l: Line): OverviewPageLineData {
    const disruptionsThisLine = disruptions.filter(
      (d) =>
        d.lines.includes(l.id) &&
        d.writeup.lineStatusIndicatorPriority !== "hidden",
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
      status: highestPriority.lineStatusIndicatorSummary,

      // TODO: [DS] Let's find a new home for this.
      statusColor: ["medium", "high"].includes(
        highestPriority.lineStatusIndicatorPriority,
      )
        ? "red"
        : "yellow",
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
