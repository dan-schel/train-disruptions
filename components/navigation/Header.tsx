import React, { useEffect, useState } from "react";
import { usePageContext } from "vike-react/usePageContext";

import { MaterialSymbolsChevronLeftRounded } from "../icons/MaterialSymbolsChevronLeftRounded";

import { lines } from "../../server/data/lines";
import { stations } from "../../server/data/stations";

const MAIN_TABS = ["/", "/commute", "/admin", "/settings"];

export function Header() {
  const pageContext = usePageContext();
  const [name, setName] = useState<string>("");

  // Sets the name in header dependent on the route
  // All routes are case-sensitive
  useEffect(() => {
    const path = pageContext.urlPathname.split("/")[1];

    if (path === "line") {
      const line = lines.get(parseInt(pageContext.routeParams.id));
      if (line) {
        setName(line.name);
      }
    } else if (path === "disruption") {
      setName("Disruption");
    } else if (path === "trip") {
      const { from, to } = pageContext.urlParsed.search;
      const fromStation = stations.get(parseInt(from));
      const toStation = stations.get(parseInt(to));
      setName(
        fromStation && toStation
          ? `${fromStation.name} to ${toStation.name}`
          : "Choose trip",
      );
    }
  }, [
    pageContext.routeParams.id,
    pageContext.urlParsed.search,
    pageContext.urlPathname,
  ]);

  if (MAIN_TABS.findIndex((tab) => tab === pageContext.urlPathname) !== -1)
    return null;

  return (
    <header className="grid w-full grid-cols-center bg-white p-2 px-1 max-lg:sticky max-lg:top-0 max-lg:z-10 max-lg:border max-lg:border-black lg:grid-cols-center-lg">
      <button
        className="col-start-2 flex w-full items-center justify-start gap-2 font-medium"
        onClick={() => window.history.back()}
      >
        <MaterialSymbolsChevronLeftRounded className="size-10" />
        {name}
      </button>
    </header>
  );
}
