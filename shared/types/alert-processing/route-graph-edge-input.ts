export type RouteGraphAlternativeEdgeInput = {
  stationA: number;
  stationB: number;
  mode: "bus" | "tram" | "walk";
};

export type RouteGraphTrainEdgeInput = {
  stationA: number;
  stationB: number;
  line: number;
  isRegionalTrain: boolean;
};

export type RouteGraphEdgeInput =
  | ({ type: "alternative" } & RouteGraphAlternativeEdgeInput)
  | ({ type: "train" } & RouteGraphTrainEdgeInput);
