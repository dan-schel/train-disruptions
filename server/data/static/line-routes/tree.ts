import { unique } from "@dan-schel/js-utils";

/** Generic class to represent a tree (i.e. a graph without cycles). */
export class Tree<Node, EdgeData> {
  constructor(
    readonly root: Node,
    readonly edges: readonly Edge<Node, EdgeData>[],
    readonly nodeEqualsFunc: (a: Node, b: Node) => boolean,
  ) {}

  throwUnlessValid() {
    const allNodes = unique(
      this.edges.flatMap((e) => [e.from, e.to]),
      (a, b) => this.nodeEqualsFunc(a, b),
    );

    const seen: Node[] = [];
    this._dfs(this.root, seen);

    if (seen.length !== allNodes.length) {
      throw new Error(
        `Tree is not connected. Only ${seen.length} out of ${allNodes.length} nodes are connected to the root.`,
      );
    }
  }

  private _dfs(node: Node, seen: Node[]) {
    if (seen.includes(node)) {
      throw new Error(`Cycle detected at node "${node}".`);
    }
    seen.push(node);
    const edges = this.getEdgesFrom(node);
    edges.forEach((e) => this._dfs(e.to, seen));
  }

  getEdgesFrom(from: Node): Edge<Node, EdgeData>[] {
    return this.edges.filter((e) => e.from === from);
  }

  getEdgeTo(to: Node): Edge<Node, EdgeData> {
    const result = this.edges.find((e) => e.to === to);
    if (result == null) {
      throw new Error(`Node ${to} not found in tree.`);
    }
    return result;
  }

  hasNode(node: Node): boolean {
    return this.edges.some(
      (e) =>
        this.nodeEqualsFunc(e.from, node) || this.nodeEqualsFunc(e.to, node),
    );
  }

  getPathFromRootTo(node: Node): Edge<Node, EdgeData>[] {
    // Start at the node and continue following "from" edges until we reach the root.
    const path: Edge<Node, EdgeData>[] = [];
    let current = node;
    while (current !== this.root) {
      const edge = this.getEdgeTo(current);
      path.unshift(edge);
      current = edge.from;
    }
    return path;
  }

  getPathBetween(a: Node, b: Node): Edge<Node, EdgeData>[] {
    const pathToA = this.getPathFromRootTo(a);
    const pathToB = this.getPathFromRootTo(b);

    // Strip common edges from the start of the paths.
    while (
      pathToA[0] != null &&
      pathToB[0] != null &&
      pathToA[0].equals(pathToB[0])
    ) {
      pathToA.shift();
      pathToB.shift();
    }

    const reversedPathToA = [...pathToA].reverse().map((e) => e.reverse());
    return [...reversedPathToA, ...pathToB];
  }
}

/** Represents an edge in a tree. */
export class Edge<Node, EdgeData> {
  constructor(
    readonly from: Node,
    readonly to: Node,
    readonly data: EdgeData,
  ) {
    if (from === to) {
      throw new Error(
        `Tree edge created with identical from and to: "${from}".`,
      );
    }
  }

  reverse(): Edge<Node, EdgeData> {
    return new Edge(this.to, this.from, this.data);
  }

  equals(other: Edge<Node, EdgeData>): boolean {
    return this.from === other.from && this.to === other.to;
  }
}
