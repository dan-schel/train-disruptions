import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionRepository } from "@/server/database-repository/disruption-repository";
import { JsonSerializable } from "@/shared/json-serializable";
import { DisruptionSummary, DisruptionType } from "@/shared/types/disruption";
import { PageContext } from "vike/types";

type PreprocessedDisruption = {
  disruption: Disruption;
  lines: readonly number[];
  writeup: DisruptionWriteup;
};

export type Data = {
  disruptions: DisruptionSummary[];
  filters: {
    type: DisruptionType[];
  };
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;

  const typeFilter = getDisruptionTypeFilter(
    pageContext.urlParsed.searchAll.type,
  );

  const disruptions = (
    await DisruptionRepository.getRepository(app).listDisruptions({
      types: typeFilter,
      valid: "either",
    })
  ).map((x) => ({
    disruption: x,
    lines: x.data.getImpactedLines(app),
    writeup: x.data.getWriteupAuthor().write(app, x),
  }));

  return {
    disruptions: getSummaries(disruptions, app),
    filters: {
      type: typeFilter,
    },
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

function getDisruptionTypeFilter(types?: string[]) {
  const defaultTypes: DisruptionType[] = [
    "bus-replacements",
    "custom",
    "delays",
    "no-city-loop",
    "no-trains-running",
    "station-closure",
  ];

  if (!types) return defaultTypes;

  const filtered = types.filter((type): type is DisruptionType =>
    defaultTypes.some((x) => x === type),
  );

  return filtered.length ? filtered : defaultTypes;
}
