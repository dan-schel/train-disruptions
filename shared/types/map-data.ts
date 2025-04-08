export type SerializedMapHighlighting = {
  segments: SerializedHighlightedMapSegment[];
  points: SerializedHighlightedMapPoint[];
};

export type SerializedHighlightedMapSegment = {
  nodeIdA: number;
  nodeIdB: number;
  min: number;
  max: number;
  style: "standard";
};

export type SerializedHighlightedMapPoint = {
  nodeIdA: number;
  nodeIdB: number;
  percentage: number;
  style: "standard";
};
