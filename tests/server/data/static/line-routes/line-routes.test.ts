import { describe, expect, it } from "vitest";
import { lines } from "../../../../../server/data/static/lines";
import { stations } from "../../../../../server/data/static/stations";

describe("Melbourne default line route edges", () => {
  it("should match the snapshot", () => {
    let output = "";

    for (const line of lines.all()) {
      output += "\n";

      output += `${line.name}:\n`;
      for (const edge of line.route.getAllPairs()) {
        const a = stations.require(edge.a).name;
        const b = stations.require(edge.b).name;
        output += `  ${a} -> ${b}\n`;
      }
    }

    expect(output).toMatchSnapshot();
  });
});
