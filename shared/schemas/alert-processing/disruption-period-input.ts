import { z } from "zod";

export const EndsAfterLastServiceInputJson = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
});

export const EndsApproximatelyInputJson = z.object({
  displayText: z.string(),
  earliest: z.string(),
  latest: z.string(),
});

export const EndsExactlyInputJson = z.object({
  date: z.string(),
});

export const EndsInputJson = z.discriminatedUnion("type", [
  z
    .object({ type: z.literal("ends-after-last-service") })
    .merge(EndsAfterLastServiceInputJson),
  z
    .object({ type: z.literal("ends-approximately") })
    .merge(EndsApproximatelyInputJson),
  z.object({ type: z.literal("ends-exactly") }).merge(EndsExactlyInputJson),
  z.object({ type: z.literal("ends-never") }),
  z.object({ type: z.literal("ends-when-alert-ends") }),
]);

export const StandardDisruptionPeriodInputJson = z.object({
  start: z.string(),
  end: EndsInputJson,
});

export const EveningsOnlyDisruptionPeriodInputJson = z.object({
  start: z.string(),
  end: EndsInputJson,
  startHourEachDay: z.number(),
});

export const DisruptionPeriodInputJson = z.discriminatedUnion("type", [
  z
    .object({ type: z.literal("standard") })
    .merge(StandardDisruptionPeriodInputJson),
  z
    .object({ type: z.literal("evenings-only") })
    .merge(EveningsOnlyDisruptionPeriodInputJson),
]);
