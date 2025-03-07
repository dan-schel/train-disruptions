import { PageContext } from "vike/types";
import { Disruption } from "../../../components/calendar/Calendar";

export type Data = {
  backHref: string;
  data: BusReplacement | Delay | StationClosure | AlteredRoute | NotFound;
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

export type AlteredRoute = {
  type: "altered-route";
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

  // TODO: Fetch this data from the database, currently static data
  if (id === "1")
    return {
      data: {
        type: "bus-replacement",
        title: "Buses replace trains between Caulfield and Westall",
        description:
          "Buses replace trains between Caulfield and Westall from 8:30 PM Saturday 1 March until further notice",
        disruption: [
          {
            from: new Date("2025-03-01T09:30:00Z"),
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

  if (id === "4") {
    return {
      data: {
        type: "altered-route",
        title:
          "Trains terminate and originate at Southern Cross on the Sunbury line",
        description:
          "Sunbury trains terminate and originate at Southern Cross from 9:30pm to last service each night, Sunday 16 March to Wednesday 19 March, due to maintenance works.",
        disruption: {
          evenings: true,
          from: new Date("2025-03-16T10:30:00Z"),
          to: new Date("2025-03-19T12:59:59Z"),
        },
        link: "http://ptv.vic.gov.au/live-travel-updates/article/craigieburn-and-sunbury-lines-trains-terminate-and-originate-at-southern-cross-930pm-to-last-service-each-night-from-sunday-16-march-to-wednesday-19-march-2025",
      },
      backHref,
    };
  }

  return { data: { type: "not-found" }, backHref };
}
