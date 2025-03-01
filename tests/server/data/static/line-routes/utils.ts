import { expect } from "vitest";
import { StationPair } from "../../../../../server/data/static/line-routes/line-route";

export function expectPair(pairs: StationPair[], a: number, b: number) {
  expect(pairs.some((pair) => pair.includes(a) && pair.includes(b))).toBe(true);
}
