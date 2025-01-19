import { InformalFlexiPoint } from "./flexi-point";
import { Path } from "./path/path";

export type LineColor =
  | "red"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "purple"
  | "pink"
  | "grey";

export type Line = {
  origin: InformalFlexiPoint;
  angle: number;
  color: LineColor;
  path: Path;
};

export type Geometry = Line[];
