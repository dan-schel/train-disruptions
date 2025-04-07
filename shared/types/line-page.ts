export type LinePageStatusColour =
  | "text-status-green"
  | "text-status-yellow"
  | "text-status-red";

export type LinePageActiveDisruption = {
  id: string;
  headline: string | null;
  subject: string;
  period: string | null;
  colour: LinePageStatusColour;
};

export type LinePageUpcomingDisruption = Omit<
  LinePageActiveDisruption,
  "colour"
>;
