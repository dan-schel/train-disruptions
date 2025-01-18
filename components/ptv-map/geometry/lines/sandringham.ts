import { FLINDERS_STREET, RICHMOND } from "../../../../server/data/station-ids";
import { interchangeMarker, Line } from "../../lib/geometry";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import * as loop from "../utils-city-loop";

/** The Sandringham line (colored pink on the map). */
export const sandringham: Line = {
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",
  path: [
    interchangeMarker({ id: FLINDERS_STREET }),
    ...flindersStreetToRichmond(loop.line.sandringham),
    interchangeMarker({ id: RICHMOND }),
  ],
};
