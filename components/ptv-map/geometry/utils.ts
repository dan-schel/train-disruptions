import { BakedPoint } from "../lib/bake";

export const lineWidth = 4;
export const lineGap = 5;
export const long45 = Math.cos(Math.PI / 4);
export const short45 = 1 - long45;
export const diagonal = 1 / Math.sqrt(2);

const fssX = 0;
const fssY = 0;

/**
 * Coordinates of Flinders Street Station on the map.
 * @param lineNumber The index of the line from the center, e.g. `0` for the
 * yellow line's position, `1` for the red line's position, etc.
 */
export function fssCoords(lineNumber: number): BakedPoint {
  return {
    min: { x: fssX, y: fssY + lineNumber * lineGap },
    max: { x: fssX, y: fssY + lineNumber * lineGap },
  };
}
