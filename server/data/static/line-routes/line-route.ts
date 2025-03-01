import { LineSection } from "../../line-section";
import { StationPair } from "./station-pair";

export abstract class LineRoute {
  _edges: StationPair[] | null = null;

  // Memoize the edges so we don't have to rebuild them every time.
  get edges(): StationPair[] {
    if (this._edges == null) {
      this._edges = this._buildEdges();
    }
    return this._edges;
  }

  protected abstract _buildEdges(): StationPair[];
  abstract getEdgesInSection(lineSection: LineSection): StationPair[];
  abstract isValidSection(lineSection: LineSection): boolean;
}
