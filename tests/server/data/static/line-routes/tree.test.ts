import { describe, expect, it } from "vitest";
import { Edge, Tree } from "../../../../../server/data/static/line-routes/tree";

describe("Tree", () => {
  describe("#throwUnlessValid", () => {
    it("handles valid trees", () => {
      const t = tree(1, [
        [1, 2],
        [2, 3],
        [1, 4],
      ]);
      expect(() => t.throwUnlessValid()).not.toThrow();
    });

    it("detects cycles", () => {
      const t = tree(1, [
        [1, 2],
        [2, 3],
        [3, 2],
      ]);
      expect(() => t.throwUnlessValid()).toThrow();
    });

    it("detects disconnected nodes", () => {
      const t = tree(1, [
        [1, 2],
        [3, 4],
      ]);
      expect(() => t.throwUnlessValid()).toThrow();
    });

    it("expects from and to be set in the correct order", () => {
      const correct = tree(1, [
        [1, 2],
        [1, 3],
      ]);
      expect(() => correct.throwUnlessValid()).not.toThrow();

      const wrong = tree(1, [
        [1, 2],
        [3, 1],
      ]);
      expect(() => wrong.throwUnlessValid()).toThrow();
    });
  });

  describe("#hasNode", () => {
    it("works", () => {
      const t = tree(1, [
        [1, 2],
        [2, 3],
        [1, 4],
      ]);
      expect(t.hasNode(1)).toBe(true);
      expect(t.hasNode(2)).toBe(true);
      expect(t.hasNode(3)).toBe(true);
      expect(t.hasNode(4)).toBe(true);
      expect(t.hasNode(5)).toBe(false);
    });
  });

  describe("#getPathFromRootTo", () => {
    it("works", () => {
      const t = tree(1, [
        [1, 2],
        [2, 3],
        [1, 4],
      ]);
      expectPath(t.getPathFromRootTo(1), [1]);
      expectPath(t.getPathFromRootTo(2), [1, 2]);
      expectPath(t.getPathFromRootTo(3), [1, 2, 3]);
      expectPath(t.getPathFromRootTo(4), [1, 4]);
      expect(() => t.getPathFromRootTo(5)).toThrow();
    });
  });

  describe("#getPathBetween", () => {
    it("works", () => {
      const t = tree(1, [
        [1, 2],
        [2, 3],
        [2, 5],
        [1, 4],
      ]);
      expectPath(t.getPathBetween(4, 3), [4, 1, 2, 3]);
      expectPath(t.getPathBetween(3, 4), [3, 2, 1, 4]);
      expectPath(t.getPathBetween(3, 5), [3, 2, 5]);
      expectPath(t.getPathBetween(5, 3), [5, 2, 3]);
      expectPath(t.getPathBetween(1, 4), [1, 4]);
      expectPath(t.getPathBetween(2, 3), [2, 3]);
      expectPath(t.getPathBetween(3, 2), [3, 2]);
      expectPath(t.getPathBetween(2, 2), [2]);
      expect(() => t.getPathBetween(1, 6)).toThrow();
      expect(() => t.getPathBetween(6, 1)).toThrow();
    });
  });

  function tree(root: number, edges: [number, number][]) {
    return new Tree<number, null>(
      root,
      edges.map((x) => new Edge<number, null>(x[0], x[1], null)),
      (a, b) => a === b,
    );
  }

  function expectPath(path: Edge<number, null>[], expected: number[]) {
    expect(path.length).toBe(expected.length - 1);
    path.forEach((edge, i) => {
      expect(edge.from).toBe(expected[i]);
      expect(edge.to).toBe(expected[i + 1]);
    });
  }
});
