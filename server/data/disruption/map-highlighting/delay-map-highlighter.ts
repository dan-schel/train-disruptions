import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import {
  HighlightedPoint,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { LineSection } from "@/server/data/line-section";
import { nonNull } from "@dan-schel/js-utils";

export class DelayMapHighlighter extends MapHighlighter {
  constructor(
    private readonly _sections: LineSection[],
    private readonly _stationIds: number[],
  ) {
    super();
  }

  // Currently only renders an icon on the affected station.
  // It would be nice to make the line dashed to indicator on the map that services are still running but slowly
  getHighlighting(app: App): MapHighlighting {
    const points = this._stationIds
      .map((x) => app.stations.require(x).mapLocation)
      .filter(nonNull)
      .map((x) => new HighlightedPoint(x, "delayed"));

    return new MapHighlighting([], points);
  }
}
