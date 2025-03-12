import { z } from "zod";
import { LineSection } from "../../line-section";
import { RouteGraphModifier } from "../route-graph-modifier/route-graph-modifier";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";
import { DisruptionDataBase } from "./disruption-data-base";
import { unique } from "@dan-schel/js-utils";
import { BusReplacementsDisruptionWriteupAuthor } from "../writeup/bus-replacements-disruption-writeup-author";
import { BusReplacementsRouteGraphModifier } from "../route-graph-modifier/bus-replacements-route-graph-modifier";

/** All or part of one or more train lines are replaced by buses. */
export class BusReplacementsDisruptionData extends DisruptionDataBase {
  constructor(readonly sections: LineSection[]) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("bus-replacements"),
      sections: LineSection.bson.array(),
    })
    .transform((x) => new BusReplacementsDisruptionData(x.sections));

  toBson(): z.input<typeof BusReplacementsDisruptionData.bson> {
    return {
      type: "bus-replacements",
      sections: this.sections.map((x) => x.toBson()),
    };
  }

  getImpactedLines(): readonly number[] {
    return unique(this.sections.map((x) => x.line));
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new BusReplacementsDisruptionWriteupAuthor(this);
  }

  getRouteGraphModifier(): RouteGraphModifier {
    return new BusReplacementsRouteGraphModifier(this.sections);
  }
}
