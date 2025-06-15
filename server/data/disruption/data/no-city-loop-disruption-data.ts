import { App } from "@/server/app";
import { DisruptionDataBase } from "@/server/data/disruption/data/disruption-data-base";
import { NoCityLoopMapHighlighter } from "@/server/data/disruption/map-highlighting/no-city-loop-map-highlighter";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import { NoCityLoopRouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/no-city-loop-route-graph-modifier";
import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { NoCityLoopDisruptionWriteupAuthor } from "@/server/data/disruption/writeup/no-city-loop-disruption-writeup-author";
import { unique } from "@dan-schel/js-utils";
import { z } from "zod";
import * as line from "@/shared/line-ids";

// TODO: Remove Cranbourne, Pakenham, and Sunbury when Metro Tunnel is operating
const CityLoopLines = [
  line.ALAMEIN,
  line.BELGRAVE,
  line.GLEN_WAVERLEY,
  line.LILYDALE,
  line.HURSTBRIDGE,
  line.MERNDA,
  line.CRANBOURNE,
  line.PAKENHAM,
  line.CRAIGIEBURN,
  line.SUNBURY,
  line.UPFIELD,
];

export class NoCityLoopDisruptionData extends DisruptionDataBase {
  constructor(readonly lineIds: number[]) {
    super();

    // Prevent this disruption from being created on lines that don't
    // traverse through the city loop
    this.lineIds = unique(
      this.lineIds.filter((line) => CityLoopLines.includes(line)),
    );
    if (this.lineIds.length < 1) {
      throw new Error(
        "Lines must include at least 1 line that runs through the city loop",
      );
    }
  }

  static readonly bson = z
    .object({
      type: z.literal("no-city-loop"),
      lineIds: z.number().array(),
    })
    .transform((x) => new NoCityLoopDisruptionData(x.lineIds));

  toBson(): z.input<typeof NoCityLoopDisruptionData.bson> {
    return {
      type: "no-city-loop",
      lineIds: this.lineIds,
    };
  }

  getImpactedLines(_app: App): readonly number[] {
    return this.lineIds;
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new NoCityLoopDisruptionWriteupAuthor(this);
  }

  getRouteGraphModifier(): RouteGraphModifier {
    return new NoCityLoopRouteGraphModifier(this.lineIds);
  }

  getMapHighlighter(): MapHighlighter {
    return new NoCityLoopMapHighlighter(this.lineIds);
  }
}
