import { PageContext } from "vike/types";

export type Line = {
  id: number;
  name: string;
};

export type Data = {
  suburban: Line[];
  regional: Line[];
};

const SortByNameDesc = (a: Line, b: Line) => a.name.localeCompare(b.name);

export function data(pageContext: PageContext): Data {
  const { app } = pageContext.custom;

  const suburban = app.lines
    .filter((line) => line.lineGroup === "suburban")
    .map((line) => ({ id: line.id, name: line.name }));
  const regional = app.lines
    .filter((line) => line.lineGroup === "regional")
    .map((line) => ({ id: line.id, name: line.name }));

  return {
    suburban: suburban.sort(SortByNameDesc),
    regional: regional.sort(SortByNameDesc),
  };
}
