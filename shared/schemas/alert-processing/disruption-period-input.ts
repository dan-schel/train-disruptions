import { z } from "zod";

export const EndsAfterLastServiceInputJson = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
});
export type EndsAfterLastServiceInput = z.input<
  typeof EndsAfterLastServiceInputJson
>;

export const EndsApproximatelyInputJson = z.object({
  displayText: z.string(),
  earliest: z.coerce.date(),
  latest: z.coerce.date(),
});
export type EndsApproximatelyInput = z.input<typeof EndsApproximatelyInputJson>;

export const EndsExactlyInputJson = z.object({
  date: z.coerce.date(),
});
export type EndsExactlyInput = z.input<typeof EndsExactlyInputJson>;

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
export type EndsInput = z.input<typeof EndsInputJson>;

export const StandardDisruptionPeriodInputJson = z.object({
  start: z.coerce.date(),
  end: EndsInputJson,
});
export type StandardDisruptionPeriodInput = z.input<
  typeof StandardDisruptionPeriodInputJson
>;

export const EveningsOnlyDisruptionPeriodInputJson = z.object({
  start: z.coerce.date(),
  end: EndsInputJson,
  startHourEachDay: z.number(),
});
export type EveningsOnlyDisruptionPeriodInput = z.input<
  typeof EveningsOnlyDisruptionPeriodInputJson
>;

export const DisruptionPeriodInputJson = z.discriminatedUnion("type", [
  z
    .object({ type: z.literal("standard") })
    .merge(StandardDisruptionPeriodInputJson),
  z
    .object({ type: z.literal("evenings-only") })
    .merge(EveningsOnlyDisruptionPeriodInputJson),
]);
export type DisruptionPeriodInput = z.input<typeof DisruptionPeriodInputJson>;
