import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { parseIntNull } from "@dan-schel/js-utils";
import { DisruptionSource } from "@/server/disruption-source/disruption-source";
import z from "zod";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionSummary } from "@/shared/types/disruption-summary";
import { NonEmptyArray } from "@/shared/types/non-empty-array";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";

type PreprocessedDisruption = {
  disruption: Disruption;
  lines: readonly number[];
  writeup: DisruptionWriteup;
};

export type Data = {
  page: number;
  disruptions: DisruptionSummary[];
  lines: { label: string; value: string }[];
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;
  const { page } = pageContext.urlParsed.search;

  const searchSchema = z
    .object({
      valid: z.enum(["true", "false"]).default("true"),
      line: z.coerce.number().optional(),
      occurs: z.enum(["at", "during", "any"]).default("any"),
      at: z.coerce.date().optional(),
      start: z.coerce.date().optional(),
      end: z.coerce.date().optional(),
    })
    .transform(({ valid, line, occurs, at, start, end }) => ({
      valid: valid ? valid === "true" : undefined,
      lines: line ? <NonEmptyArray<number>>[line] : undefined,
      period:
        occurs !== "any"
          ? occurs === "at"
            ? at
            : start || end
              ? new TimeRange(start ?? null, end ?? null)
              : undefined
          : undefined,
    }));
  const search = searchSchema.safeParse(pageContext.urlParsed.search);

  const disruptionSource = DisruptionSource.getInstance(app);
  const disruptions = (
    await disruptionSource.listDisruptions(search.success ? search.data : {})
  ).map((x) => ({
    disruption: x,
    lines: x.data.getImpactedLines(app),
    writeup: x.data.getWriteupAuthor().write(app, x),
  }));

  return {
    page: parseIntNull(page) ?? 1,
    disruptions: getSummaries(disruptions),
    lines: app.lines.map((line) => ({
      label: `${line.name} line`,
      value: line.id.toString(),
    })),
  };
}

function getSummaries(
  disruptions: PreprocessedDisruption[],
): DisruptionSummary[] {
  return disruptions.map((x) => ({
    id: x.disruption.id,
    headline: x.writeup.summary.headline,
    subject: x.writeup.summary.subject,
    period: x.writeup.summary.period,
    icon: x.writeup.summary.iconType,
  }));
}
