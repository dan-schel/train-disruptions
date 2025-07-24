export type AlertProcessingContextData = {
  lines: {
    id: number;
    name: string;
    lineShapeNodes: {
      id: string;
      name: string;
    }[];
  }[];
  stations: {
    id: number;
    name: string;
  }[];
};
