import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import {
  HighlightedSegment,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { LineSection } from "@/server/data/line-section";
import { nonNull } from "@dan-schel/js-utils";
import * as line from "@/shared/line-ids";
import { JOLIMONT, NORTH_MELBOURNE, RICHMOND } from "@/shared/station-ids";
import * as mapNode from "@/shared/map-node-ids";

// Maps each line with the last station traversed before entering the city loop
const LineSectionMapping: Readonly<Record<number, number[]>> = {
  [RICHMOND]: [
    line.ALAMEIN,
    line.BELGRAVE,
    line.CRANBOURNE,
    line.GLEN_WAVERLEY,
    line.LILYDALE,
    line.PAKENHAM,
  ],
  [JOLIMONT]: [line.HURSTBRIDGE, line.MERNDA],
  [NORTH_MELBOURNE]: [line.CRAIGIEBURN, line.SUNBURY, line.UPFIELD],
};

// Map nodes to remove from map segements
const DirectToFlindersStreet = [
  mapNode.BURNLEY.FLINDERS_STREET_DIRECT,
  mapNode.CLIFTON_HILL.FLINDERS_STREET_DIRECT,
  mapNode.DANDENONG.FLINDERS_STREET_DIRECT,
  mapNode.NORTHERN.FLINDERS_STREET_DIRECT,
  mapNode.NORTHERN.SOUTHERN_CROSS, // Northern loop needs to pass through Southern Cross
];

export class NoCityLoopMapHighlighter extends MapHighlighter {
  constructor(private _lineIds: number[]) {
    super();
  }

  getHighlighting(app: App): MapHighlighting {
    const lines = this._lineIds
      .map((x) => {
        const line = app.lines.get(x);
        const sectionStation = Object.keys(LineSectionMapping).find((station) =>
          LineSectionMapping[parseInt(station)].includes(x),
        );

        if (!line || !sectionStation) return null;

        return {
          line,
          section: new LineSection(x, "the-city", parseInt(sectionStation)),
        };
      })
      .filter(nonNull);
    const segments = lines
      .flatMap(({ line, section }) =>
        line.route
          .getMapSegmentsInSection(section)
          .filter(({ mapNodeA }) =>
            DirectToFlindersStreet.every((node) => mapNodeA !== node),
          ),
      )
      .map((x) => new HighlightedSegment(x, "standard"));

    return new MapHighlighting(segments, []);
  }
}
