import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionRepository } from "@/server/database-repository/disruption-repository";
import { JsonSerializable } from "@/shared/json-serializable";
import { DisruptionSummary } from "@/shared/types/disruption";
import { PageContext } from "vike/types";

type PreprocessedDisruption = {
  disruption: Disruption;
  lines: readonly number[];
  writeup: DisruptionWriteup;
};

export type Data = {
  disruptions: DisruptionSummary[];
  lines: { name: string; id: number; lineGroup: "suburban" | "regional" }[];
  // filters: FilterInput;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;

  const disruptions = (
    await DisruptionRepository.getRepository(app).listDisruptions({
      valid: "either",
    })
  ).map((x) => ({
    disruption: x,
    lines: x.data.getImpactedLines(app),
    writeup: x.data.getWriteupAuthor().write(app, x),
  }));

  return {
    disruptions: getSummaries(disruptions, app),
    lines: [],
  };
}

function getSummaries(
  disruptions: PreprocessedDisruption[],
  app: App,
): DisruptionSummary[] {
  return disruptions.map((x) => ({
    id: x.disruption.id,
    headline: x.writeup.summary.headline,
    subject: x.writeup.summary.subject,
    period: x.writeup.summary.period,
    icon: x.writeup.summary.iconType,
    valid: x.disruption.data.validate(app),
  }));
}
