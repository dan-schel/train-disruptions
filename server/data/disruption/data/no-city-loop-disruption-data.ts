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

export class NoCityLoopDisruptionData extends DisruptionDataBase {
  constructor(readonly lineIds: number[]) {
    super();

    this.lineIds = unique(this.lineIds);
    if (this.lineIds.length < 1) {
      throw new Error("Lines must include at least 1 line");
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

  inspect(): string {
    return JSON.stringify(this.toBson(), undefined, 2);
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

  validate(app: App): boolean {
    try {
      // Call all functions to check if its safe for FE to call
      this.getImpactedLines(app);
      this.getWriteupAuthor();
      this.getRouteGraphModifier();
      this.getMapHighlighter();

      return (
        this.lineIds.filter((line) =>
          app.lines
            .get(line)
            ?.route.getAllLineShapeNodes()
            .includes("the-city"),
        ).length > 0
      );
    } catch (error) {
      console.warn(`Invalid disruption: ${error}`);
      return false;
    }
  }
}
