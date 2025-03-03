import { describe, expect, it } from "vitest";
import { lines } from "../../../../../server/data/static/lines";
import { stations } from "../../../../../server/data/static/stations";
import { LineShape } from "../../../../../server/data/static/line-routes/line-shape";
import { LineSectionBoundary } from "../../../../../server/data/line-section";

describe("Melbourne default line route edges", () => {
  it("should match the snapshot", () => {
    let output = "";

    for (const line of lines.all()) {
      if (output !== "") {
        output += "\n\n";
      }
      output += "\n";

      output += `[${line.name.toUpperCase()} LINE]\n`;
      output += `\nAll route graph pairs:\n`;
      for (const edge of line.route.getAllRouteGraphPairs()) {
        const a = stations.require(edge.a).name;
        const b = stations.require(edge.b).name;
        output += `  ${a} -> ${b}\n`;
      }

      // Cheating a bit here :)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lineShape: LineShape = (line.route as any)._shape;

      output += `\nLine shape edges:\n`;
      for (const edge of lineShape.edges) {
        const a = formatBoundary(edge.from);
        const b = formatBoundary(edge.to);

        const pairs = edge.data.routeGraphPairs.map((pair) => {
          const a = stations.require(pair.a).name;
          const b = stations.require(pair.b).name;
          return `${a} -> ${b}`;
        });

        output += `  ${a} -> ${b}: [${pairs.join(", ")}]\n`;
      }
    }

    expect(output).toMatchSnapshot();
  });

  function formatBoundary(boundary: LineSectionBoundary) {
    if (boundary === "the-city") {
      return '"The City"';
    } else {
      return stations.require(boundary).name;
    }
  }
});
