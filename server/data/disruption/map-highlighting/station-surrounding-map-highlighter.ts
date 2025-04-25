import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import {
  // HighlightedPoint,
  // HighlightedSegment,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { LineSection } from "@/server/data/line-section";
// import { nonNull } from "@dan-schel/js-utils";

export class StationSurroundingMapHighlighter extends MapHighlighter {
  constructor(
    private readonly _sections: LineSection[],
    private readonly _stationIds: number[],
  ) {
    super();
  }

  // TODO: Make line sections dashed and change icon
  getHighlighting(_app: App): MapHighlighting {
    // const segments = this._sections
    //   .flatMap((section) =>
    //     app.lines.require(section.line).route.getMapSegmentsInSection(section),
    //   )
    //   .map((x) => new HighlightedSegment(x, "standard"));

    // const points = this._stationIds
    //   .map((x) => app.stations.require(x).mapLocation)
    //   .filter(nonNull)
    //   .map((x) => new HighlightedPoint(x, "standard"));

    return new MapHighlighting([], []);
  }
}
