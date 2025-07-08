export type MapHighlightingInput = {
  segments: {
    segment: {
      mapNodeA: number;
      mapNodeB: number;
      percentage: {
        min: number;
        max: number;
      };
    };
    style: "standard";
  }[];
  points: {
    point: {
      segmentANodeA: number;
      segmentANodeB: number;
      segmentBNodeA: number;
      segmentBNodeB: number;
      percentage: number;
    };
    style: "standard" | "delayed";
  }[];
};
