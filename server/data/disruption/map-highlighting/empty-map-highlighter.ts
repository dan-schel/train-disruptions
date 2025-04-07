import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";

export class EmptyMapHighlighter extends MapHighlighter {
  constructor() {
    super();
  }

  getHighlighting(_app: App): MapHighlighting {
    return MapHighlighting.none;
  }
}
