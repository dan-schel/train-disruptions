import { RouteGraphImplications } from "../../route-graph/route-graph-implications";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";

/** Stores the data inherent to this particular type of disruption. */
export abstract class DisruptionDataBase {
  abstract getWriteupAuthor(): DisruptionWriteupAuthor;
  abstract getRouteGraphImplications(): RouteGraphImplications;
}
