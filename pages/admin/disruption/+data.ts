import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { DisruptionSource } from "@/server/database-source/disruption-source";
import z from "zod";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionSummary } from "@/shared/types/disruption-summary";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";
import { nonNull, parseIntNull } from "@dan-schel/js-utils";
import { DisruptionType } from "@/shared/types/disruption";

type PreprocessedDisruption = {
  disruption: Disruption;
  lines: readonly number[];
  writeup: DisruptionWriteup;
};

export type Data = {
  disruptions: DisruptionSummary[];
  lines: { name: string; id: number; lineGroup: "suburban" | "regional" }[];
  filters: FilterInput;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;
  const { search, searchAll } = pageContext.urlParsed;

  const input = {
    lines: searchAll.lines,
    types: searchAll.types,
    start: search.start,
    end: search.end,
    valid: search.valid,
  };

  const filters = parseSearchParams(input);

  const disruptions = (
    await DisruptionSource.getInstance(app).listDisruptions(filters ?? {})
  ).map((x) => ({
    disruption: x,
    lines: x.data.getImpactedLines(app),
    writeup: x.data.getWriteupAuthor().write(app, x),
  }));

  return {
    disruptions: getSummaries(disruptions),
    lines: app.lines.map((line) => ({
      name: `${line.name} line`,
      id: line.id,
      lineGroup: line.lineGroup,
    })),
    filters: filters
      ? {
          lines: input.lines
            ? input.lines.map(parseIntNull).filter(nonNull)
            : undefined,
          types: input.types ? (input.types as DisruptionType[]) : undefined,
          start: input.start ? new Date(input.start) : undefined,
          end: input.end ? new Date(input.end) : undefined,
          valid: input.valid
            ? (input.valid as FilterInput["valid"])
            : undefined,
        }
      : {},
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

function parseSearchParams(
  input: Record<string, string | string[]>,
): FilterOutput | null {
  const { success, data } = filterSchema.safeParse(input);

  return success ? data : null;
}

const filterSchema = z
  .object({
    lines: z.coerce.number().array().optional(),
    types: z
      .enum([
        "custom",
        "station-closure",
        "bus-replacements",
        "delays",
        "no-city-loop",
      ])
      .array()
      .optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    valid: z.enum(["all", "valid", "invalid"]).default("all"),
  })
  .transform(({ valid, lines, types, start, end }) => ({
    lines: lines,
    types,
    period: new TimeRange(start ?? null, end ?? null),
    valid: valid !== "all" ? valid === "valid" : undefined,
  }));
export type FilterInput = z.input<typeof filterSchema>;
type FilterOutput = z.output<typeof filterSchema>;
