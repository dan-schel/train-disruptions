export type DisruptionType =
  | "custom"
  | "station-closure"
  | "bus-replacements"
  | "delays"
  | "no-city-loop"
  | "no-trains-running";

export type DisruptionSummary = {
  id: string;
  headline: string | null;
  subject: string;
  period: string | null;
  icon: "line" | "cross" | "altered-route" | "traffic";
  valid?: boolean;
};
