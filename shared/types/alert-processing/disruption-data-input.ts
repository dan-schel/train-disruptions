export type LineSectionInput = {
  line: number;
  a: number | "the-city";
  b: number | "the-city";
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type CustomDisruptionDataInput = {
  // TODO: [DS] Good luck!
};

export type StationClosureDisruptionDataInput = {
  stationId: number;
};

export type BusReplacementsDisruptionDataInput = {
  sections: LineSectionInput[];
};

export type DelaysDisruptionDataInput = {
  stationId: number;
  delayInMinutes: number;
  sections: LineSectionInput[];
};

export type NoCityLoopDisruptionDataInput = {
  lineIds: number[];
};

export type DisruptionDataInput =
  | ({ type: "custom" } & CustomDisruptionDataInput)
  | ({ type: "station-closure" } & StationClosureDisruptionDataInput)
  | ({ type: "bus-replacements" } & BusReplacementsDisruptionDataInput)
  | ({ type: "delays" } & DelaysDisruptionDataInput)
  | ({ type: "no-city-loop" } & NoCityLoopDisruptionDataInput);
