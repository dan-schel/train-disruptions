import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";

export class CustomMapHighlighter extends MapHighlighter {
  constructor(private readonly _highlighting: MapHighlighting) {
    super();
  }

  getHighlighting(_app: App): MapHighlighting {
    return this._highlighting;
  }
}
