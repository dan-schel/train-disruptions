import { App } from "@/server/app";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";

export abstract class MapHighlighter {
  abstract getHighlighting(app: App): MapHighlighting;
}
