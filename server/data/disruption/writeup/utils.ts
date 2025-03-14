import { App } from "@/server/app";
import { LineSection } from "@/server/data/line-section";
import { LineShapeNode } from "@/server/data/static/line-routes/line-shape";
import { listifyAnd, unique } from "@dan-schel/js-utils";

export function formatSections(app: App, sections: LineSection[]): string {
  if (sections.length === 0) {
    throw new Error("Must have at least one section.");
  }

  if (sections.length === 1 || allTheSame(sections)) {
    const a = formatLineShapeNode(app, sections[0].a);
    const b = formatLineShapeNode(app, sections[0].b);
    return `from ${a} to ${b}`;
  }

  const commonNode = getCommonNode(sections);
  if (commonNode != null) {
    const common = formatLineShapeNode(app, commonNode.common);
    const connections = commonNode.connections.map((n) =>
      formatLineShapeNode(app, n),
    );
    return `from ${common} to ${listifyAnd(connections)}`;
  }

  const individualSections = sections.map((s) => {
    const a = formatLineShapeNode(app, s.a);
    const b = formatLineShapeNode(app, s.b);
    return `${a} to ${b}`;
  });
  return `from ${listifyAnd(individualSections)}`;
}

function formatLineShapeNode(app: App, node: LineShapeNode): string {
  if (node === "the-city") return "the city";
  return app.stations.require(node).name;
}

function allTheSame(sections: LineSection[]): boolean {
  const first = sections[0];
  return sections.every(
    (s) =>
      (s.a === first.a && s.b === first.b) ||
      (s.a === first.b && s.b === first.a),
  );
}

function getCommonNode(
  sections: LineSection[],
): { common: LineShapeNode; connections: LineShapeNode[] } | null {
  const allNodes = unique(sections.map((s) => [s.a, s.b]).flat());

  const common = allNodes.find((n) =>
    sections.every((s) => s.a === n || s.b === n),
  );
  if (common == null) return null;

  const connections = allNodes.filter((n) => n !== common);
  return { common, connections };
}
