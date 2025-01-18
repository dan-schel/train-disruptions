import { Line } from "../../lib/geometry";
import { gippslandLine } from "../segments/gippsland-line";
import { regionalSxsToNme } from "../segments/regional-sxs-to-nme";

/**
 * The Gippsland line, which is the only regional line (colored purple on the
 * map) to depart Southern Cross towards Flinders Street and ultimately heads
 * east.
 */
export const regionalEastern: Line = {
  x: -80,
  y: -22,
  angle: 0,
  color: "purple",
  path: gippslandLine(),
};

/**
 * The Ballarat, Bendigo, Geelong, and Seymour lines, which are regional lines
 * (colored purple on the map) that depart Southern Cross toward North
 * Melbourne/Footscray.
 */
export const regionalWestern: Line = {
  x: -70,
  y: -28,
  angle: 180,
  color: "purple",
  path: regionalSxsToNme(),
};
