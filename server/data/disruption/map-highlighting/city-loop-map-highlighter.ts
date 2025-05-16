import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import {
  HighlightedSegment,
  MapHighlighting,
} from "@/server/data/disruption/map-highlighting/map-highlighting";
import { LineSection } from "@/server/data/line-section";
import { nonNull } from "@dan-schel/js-utils";
import {
  BURNLEY,
  CLIFTON_HILL,
  DANDENONG,
  NORTHERN,
} from "@/shared/map-node-ids";
import * as line from "@/shared/line-ids";
import { JOLIMONT, NORTH_MELBOURNE, RICHMOND } from "@/shared/station-ids";

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

const FLINDERS_STREET_DIRECT = [
  BURNLEY.FLINDERS_STREET_DIRECT,
  CLIFTON_HILL.FLINDERS_STREET_DIRECT,
  DANDENONG.FLINDERS_STREET_DIRECT,
  NORTHERN.FLINDERS_STREET_DIRECT,
];

export class CityLoopMapHighlighter extends MapHighlighter {
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
      .flatMap((x) =>
        x.line.route.getMapSegmentsInSection(x.section).filter(
          (x) =>
            FLINDERS_STREET_DIRECT.every((node) => x.mapNodeA !== node) &&
            // Northern loop needs to pass through Southern Cross
            x.mapNodeA !== NORTHERN.SOUTHERN_CROSS,
        ),
      )
      .map((x) => new HighlightedSegment(x, "standard"));

    return new MapHighlighting(segments, []);
  }
}
