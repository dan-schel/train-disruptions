export const lineWidth = 4;
export const interchangeThinLineWidth = 1;
export const interchangeThickLineWidth = 4;
export const interchangeBorderWidth = 1;
export const terminusLineWidth = 3;

export const viewportPadding = 10;

export const lineColors = [
  "red",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
  "grey",
] as const;
export type LineColor = (typeof lineColors)[number];

export const lineColorCodes: Record<LineColor, string> = {
  red: "#e42b23",
  yellow: "#ffb531",
  green: "#159943",
  cyan: "#16b4e8",
  blue: "#094c8d",
  purple: "#6c3b9f",
  pink: "#fc7fbb",
  grey: "#9b9c9f",
};

export const interchangeStrokeColor = "#45474d";
export const interchangeFillColor = "#ffffff";
