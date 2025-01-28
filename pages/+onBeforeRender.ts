import { OnBeforeRenderAsync } from "vike/types";

import { lines } from "../server/data/lines";
import { stations } from "../server/data/stations";

// TODO: [DS] Using new <BackNavigation /> component, I think most of this can
// be removed.

const MAIN_TABS = ["/", "/commute", "/admin", "/settings"];

export const onBeforeRender: OnBeforeRenderAsync = async (
  pageContext,
): ReturnType<OnBeforeRenderAsync> => {
  const path = pageContext.urlPathname.split("/")[1];

  // Determine the name used in the header
  let name = "";
  if (path === "line") {
    const line = lines.get(parseInt(pageContext.routeParams.id));
    name = line ? line.name : "Line";
  } else if (path === "disruption") {
    name = "Disruption";
  } else if (path === "trip") {
    const { from, to } = pageContext.urlParsed.search;
    const fromStation = stations.get(parseInt(from));
    const toStation = stations.get(parseInt(to));
    name =
      fromStation && toStation
        ? `${fromStation.name} to ${toStation.name}`
        : "Choose trip";
  }

  // Hide the header on main routes
  const hide =
    MAIN_TABS.findIndex((tab) => tab === pageContext.urlPathname) !== -1;

  return { pageContext: { name, hide } };
};
