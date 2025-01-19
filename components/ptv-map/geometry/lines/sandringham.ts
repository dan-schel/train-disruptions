import { FLINDERS_STREET, RICHMOND } from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import * as loop from "../utils-city-loop";

/** The Sandringham line (colored pink on the map). */
export const sandringham: Line = {
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",

  path: new Path()
    .interchange(FLINDERS_STREET)
    .add(flindersStreetToRichmond(loop.line.sandringham))
    .interchange(RICHMOND),
};
