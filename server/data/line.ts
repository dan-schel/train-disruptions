import { LineRoute } from "./line-routes/line-route";

export class Line {
  readonly id: number;
  readonly name: string;
  readonly ptvIds: readonly number[];
  readonly route: LineRoute;

  constructor({
    id,
    name,
    ptvIds,
    route,
  }: {
    id: number;
    name: string;
    ptvIds: readonly number[];
    route: LineRoute;
  }) {
    this.id = id;
    this.name = name;
    this.ptvIds = ptvIds;
    this.route = route;
  }
}
