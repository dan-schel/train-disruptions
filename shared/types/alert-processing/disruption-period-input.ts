export type EndsAfterLastServiceInput = {
  year: number;
  month: number;
  day: number;
};

export type EndsApproximatelyInput = {
  displayText: string;
  earliest: Date;
  latest: Date;
};

export type EndsExactlyInput = {
  date: Date;
};

export type EndsInput =
  | ({ type: "ends-after-last-service" } & EndsAfterLastServiceInput)
  | ({ type: "ends-approximately" } & EndsApproximatelyInput)
  | ({ type: "ends-exactly" } & EndsExactlyInput)
  | { type: "ends-never" }
  | { type: "ends-when-alert-ends" };

export type StandardDisruptionPeriodInput = {
  start: Date;
  end: EndsInput;
};

export type EveningsOnlyDisruptionPeriodInput = {
  start: Date;
  end: EndsInput;
};

export type DisruptionPeriodInput =
  | ({ type: "standard" } & StandardDisruptionPeriodInput)
  | ({ type: "evenings-only" } & EveningsOnlyDisruptionPeriodInput);
