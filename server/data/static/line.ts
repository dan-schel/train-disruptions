import { LineRoute } from "./line-routes/line-route";

type LineGroup = "suburban" | "regional";

export class Line {
  readonly id: number;
  readonly name: string;
  readonly ptvIds: readonly number[];
  readonly route: LineRoute;
  readonly lineGroup: LineGroup;

  constructor({
    id,
    name,
    ptvIds,
    route,
    lineGroup,
  }: {
    id: number;
    name: string;
    ptvIds: readonly number[];
    route: LineRoute;
    lineGroup: LineGroup;
  }) {
    this.id = id;
    this.name = name;
    this.ptvIds = ptvIds;
    this.route = route;
    this.lineGroup = lineGroup;
  }
}
