import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import {
  // HighlightedPoint,
  // HighlightedSegment,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { LineSection } from "@/server/data/line-section";
// import { nonNull } from "@dan-schel/js-utils";

export class DelayedSectionMapHighlighter extends MapHighlighter {
  constructor(private readonly _sections: LineSection[]) {
    super();
  }

  // TODO: Make line sections dashed
  getHighlighting(_app: App): MapHighlighting {
    // const segments = this._sections
    //   .flatMap((section) =>
    //     app.lines.require(section.line).route.getMapSegmentsInSection(section),
    //   )
    //   .map((x) => new HighlightedSegment(x, "standard"));

    return new MapHighlighting([], []);
  }
}
