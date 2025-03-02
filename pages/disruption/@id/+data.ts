import { PageContext } from "vike/types";
import { Disruption } from "../../../components/calendar/Calendar";

export type Data = {
  backHref: string;
  data: BusReplacement | Delay | StationClosure | NotFound;
};

export type BusReplacement = {
  type: "bus-replacement";
  title: string;
  description: string;
  disruption: Disruption | Disruption[];
  link: string;
};

export type Delay = {
  type: "delay";
  title: string;
  description: string;
  link: string;
};

export type StationClosure = {
  type: "station-closure";
  title: string;
  description: string;
  disruption: Disruption | Disruption[];
  link: string;
};

type NotFound = {
  type: "not-found";
};

export function data(pageContext: PageContext): Data {
  const { urlParsed, routeParams } = pageContext;

  const from = urlParsed.search.from ?? "";
  const backHref = from.startsWith("line")
    ? `/line/${from.split("-")[1]}`
    : "/";
  const id = routeParams.id;

  if (id === "1")
    return {
      data: {
        type: "bus-replacement",
        title: "Buses replace trains between Caulfield and Westall",
        description:
          "Buses replace trains between Caulfield and Westall from 8:30 PM Saturday 1 March until further notice",
        disruption: [
          {
            from: new Date(),
            to: new Date("2025-12-31T12:59:59Z"),
            evenings: false,
          },
        ],
        link: "http://ptv.vic.gov.au/live-travel-updates/",
      },
      backHref,
    };

  if (id === "2")
    return {
      data: {
        type: "delay",
        title: "Major delays on the Sandringham line",
        description:
          "Delays of up to 3 hours due to a police operation near Balaclava station. Select services may terminate/originate from intermediate stations.",
        link: "http://ptv.vic.gov.au/live-travel-updates/",
      },
      backHref,
    };

  if (id === "3")
    return {
      data: {
        type: "station-closure",
        title: "Glenferrie station closed",
        description:
          "Glenferrie station will be affected by temporary closure from 8pm Friday 4 April to 4am Tuesday 22 April 2025, due to maintenance works.",
        disruption: {
          from: new Date("2025-04-04T13:00:00"),
          to: new Date("2025-04-22T13:00:00"),
          evenings: false,
        },
        link: "http://ptv.vic.gov.au/live-travel-updates/",
      },
      backHref,
    };

  return { data: { type: "not-found" }, backHref };
}
