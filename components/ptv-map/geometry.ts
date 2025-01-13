export type Straight = {
  type: "straight";
  min: number;
  max: number;
};

export type Curve = {
  type: "curve";
  radius: number;
  angle: -90 | -45 | 0 | 45 | 90;
};

export type Split = {
  type: "split";
  split: Path[];
};

export type ReverseSplit = {
  type: "reverse-split";
  returner: Path[];
};

// TODO: [DS] No way to create a split interchange marker, e.g. at Sunshine, so
// far. Maybe that's a case where there's three markers with some sort of index
// and a prop to say which one has the thin line.
export type InterchangeMarker = {
  type: "interchange-marker";
  id: number;
};

export type Path = Straight | Curve | Split | ReverseSplit | InterchangeMarker;

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
  x: number;
  y: number;
  angle: number;
  color: LineColor;
  path: Path[];
};

export type Geometry = Line[];

export function straight(args: Omit<Straight, "type">): Straight {
  return { type: "straight", ...args };
}

export function curve(args: Omit<Curve, "type">): Curve {
  return { type: "curve", ...args };
}

export function split(args: Omit<Split, "type">): Split {
  return { type: "split", ...args };
}

export function reverseSplit(args: Omit<ReverseSplit, "type">): ReverseSplit {
  return { type: "reverse-split", ...args };
}

export function interchangeMarker(
  args: Omit<InterchangeMarker, "type">,
): InterchangeMarker {
  return { type: "interchange-marker", ...args };
}
