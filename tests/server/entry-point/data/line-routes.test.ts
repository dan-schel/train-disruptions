import { describe, expect, it } from "vitest";
import { lines } from "@/server/entry-point/data/lines";
import { stations } from "@/server/entry-point/data/stations";
import {
  LineShape,
  LineShapeEdge,
  LineShapeNode,
} from "@/server/data/line/line-routes/line-shape";
import { Line } from "@/server/data/line/line";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import { MapSegment } from "@/server/data/map-segment";
import * as map from "@/shared/map-node-ids";

describe("Melbourne default line route edges", () => {
  type Table = {
    header: string;
    table: [string, string, string][];
  };

  it("should match the snapshot", () => {
    const output = `\n\n\n${outputLines(lines.all())}\n\n`;
    expect(output).toMatchSnapshot();
  });

  function outputLines(lines: Line[]) {
    let output = "";

    const tables = lines.map((x) => ({ header: x.name, table: getTable(x) }));
    const column1Width = getColumnWidth(tables, 0);
    const column2Width = getColumnWidth(tables, 1);
    const column3Width = getColumnWidth(tables, 2);
    const totalWidth = column1Width + column2Width + column3Width + 4;

    for (const table of tables) {
      if (output !== "") {
        output += "\n";
      }

      output += `${"-".repeat(totalWidth)}\n`;
      output += `${table.header.toUpperCase()}\n`;
      output += `${"-".repeat(totalWidth)}\n`;
      for (const row of table.table) {
        const column1 = row[0].padEnd(column1Width);
        const column2 = row[1].padEnd(column2Width);
        const column3 = row[2].padEnd(column3Width);
        output += `${column1}  ${column2}  ${column3}\n`;
      }
    }

    return output;
  }

  function getColumnWidth(tables: Table[], column: number) {
    return Math.max(
      ...tables.flatMap((x) => x.table.map((x) => x[column].length)),
    );
  }

  function getTable(line: Line) {
    const rows: [string, string, string][] = [];

    // Cheating a bit here :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineShape: LineShape = (line.route as any)._shape;

    for (const edge of lineShape.edges) {
      rows.push(...rowsForFormatLineShapeEdge(edge));
    }

    return rows;
  }

  function rowsForFormatLineShapeEdge(
    edge: LineShapeEdge,
  ): [string, string, string][] {
    const title = formatLineShapeEdgeTitle(edge);
    const routeGraphEdges = edge.data.routeGraphPairs.map((x) =>
      formatRouteGraphPair(x),
    );
    const mapSegments = edge.data.mapSegments.map((x) => formatMapSegment(x));

    const rowCount = Math.max(1, routeGraphEdges.length, mapSegments.length);
    const rows: [string, string, string][] = [];
    for (let i = 0; i < rowCount; i++) {
      const column1 = i === 0 ? title : "";
      const column2 = i < routeGraphEdges.length ? routeGraphEdges[i] : "";
      const column3 = i < mapSegments.length ? mapSegments[i] : "";
      rows.push([column1, column2, column3]);
    }
    return rows;
  }

  function formatLineShapeEdgeTitle(edge: LineShapeEdge) {
    const a = formatLineShapeNode(edge.from);
    const b = formatLineShapeNode(edge.to);
    return `${a} -> ${b}`;
  }

  function formatRouteGraphPair(edge: StationPair) {
    const a = stations.require(edge.a).name;
    const b = stations.require(edge.b).name;
    return `${a} -> ${b}`;
  }

  function formatMapSegment(edge: MapSegment) {
    const a = formatMapNode(edge.mapNodeA);
    const b = formatMapNode(edge.mapNodeB);
    const min = edge.percentage.min.toFixed(2);
    const max = edge.percentage.max.toFixed(2);
    return `${a} -> ${b} (${min} -> ${max})`;
  }

  function formatLineShapeNode(boundary: LineShapeNode) {
    if (boundary === "the-city") {
      return '"The city"';
    } else {
      return stations.require(boundary).name;
    }
  }

  function formatMapNode(searchNodeId: number): string {
    for (const [group, groupNodes] of Object.entries(map)) {
      for (const [node, nodeId] of Object.entries(groupNodes)) {
        if (nodeId === searchNodeId) {
          return `${group}.${node}`;
        }
      }
    }
    return `Unknown node "${searchNodeId}"`;
  }
});
