import { PageContext } from "vike/types";
import { parseIntNull } from "@dan-schel/js-utils";
import { LineCollection } from "../../../server/data/static/line-collection";
import { Line } from "../../../server/data/static/line";

export type Data = {
  line: {
    name: string;
  } | null;
};

export function data(pageContext: PageContext): Data {
  const { app } = pageContext.custom;

  const line = tryGetLine(app.lines, pageContext.routeParams.id);

  if (line == null) {
    return {
      line: null,
    };
  }

  return {
    line: {
      name: line.name,
    },
  };
}

function tryGetLine(
  lines: LineCollection,
  idStr: string | null | undefined,
): Line | null {
  if (idStr == null) {
    return null;
  }

  const id = parseIntNull(idStr);
  if (id == null) {
    return null;
  }

  return lines.get(id);
}
