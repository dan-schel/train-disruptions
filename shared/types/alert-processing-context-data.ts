export type AlertProcessingContextData = {
  lines: {
    id: number;
    name: string;
    lineShapeNodes: {
      id: "the-city" | number;
      name: string;
    }[];
  }[];
  stations: {
    id: number;
    name: string;
  }[];
};
