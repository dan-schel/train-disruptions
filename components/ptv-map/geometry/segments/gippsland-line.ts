import { curve, Path, straight } from "../../lib/geometry";
import { flindersStreetToRichmond } from "./flinders-street-to-richmond";
import * as loop from "../utils-city-loop";

export function gippslandLine(): Path[] {
  return [
    // Southern Cross
    curve({ radius: 5, angle: 90 }),
    straight({ min: 2, max: 2 }),
    curve({ radius: 35, angle: -90 }),
    straight({ min: 40, max: 40 }),
    // Flinders Street
    ...flindersStreetToRichmond(loop.line.regional),
    // Richmond
  ];
}
