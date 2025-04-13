import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import {
  HighlightedPoint,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { nonNull } from "@dan-schel/js-utils";

export class StationMapHighlighter extends MapHighlighter {
  constructor(private readonly _stationIds: number[]) {
    super();
  }

  getHighlighting(app: App): MapHighlighting {
    const points = this._stationIds
      .map((x) => app.stations.require(x).mapLocation)
      .filter(nonNull)
      .map((x) => new HighlightedPoint(x, "standard"));

    return new MapHighlighting([], points);
  }
}
