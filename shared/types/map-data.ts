export type SerializedMapHighlighting = {
  segments: SerializedHighlightedMapSegment[];
  points: SerializedHighlightedMapPoint[];
};

export type SerializedHighlightedMapSegment = {
  nodeIdA: number;
  nodeIdB: number;
  start: number;
  end: number;
  style: "standard";
};

export type SerializedHighlightedMapPoint = {
  nodeIdA: number;
  nodeIdB: number;
  percentage: number;
  style: "standard";
};
