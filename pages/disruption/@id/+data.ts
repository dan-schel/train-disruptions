import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { CalendarData } from "@/shared/types/calendar-data";

export type Data = {
  backHref: string;
  data: BusReplacement | Delay | StationClosure | AlteredRoute | NotFound;
};

export type BusReplacement = {
  type: "bus-replacement";
  title: string;
  description: string;
  calendar: CalendarData;
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
  calendar: CalendarData;
  link: string;
};

export type AlteredRoute = {
  type: "altered-route";
  title: string;
  description: string;
  calendar: CalendarData;
  link: string;
};

type NotFound = {
  type: "not-found";
};

export function data(pageContext: PageContext): Data & JsonSerializable {
  const { urlParsed, routeParams } = pageContext;
  const app = pageContext.custom.app;

  const from = urlParsed.search.from ?? "";
  const backHref = from.startsWith("line")
    ? `/line/${from.split("-")[1]}`
    : "/";
  const id = routeParams.id;

  // TODO: Fetch this data from the database, currently static data
  if (id === "1") {
    const disruption = [
      {
        from: new Date("2025-03-01T09:30:00Z"),
        to: new Date("2025-12-31T12:59:59Z"),
        evenings: false,
      },
    ];
    return {
      data: {
        type: "bus-replacement",
        title: "Buses replace trains between Caulfield and Westall",
        description:
          "Buses replace trains between Caulfield and Westall from 8:30 PM Saturday 1 March until further notice",
        calendar: toCalendarData(disruption, app.time.now()),
        link: "http://ptv.vic.gov.au/live-travel-updates/",
      },
      backHref,
    };
  }

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

  if (id === "3") {
    const disruption = {
      from: new Date("2025-04-04T13:00:00"),
      to: new Date("2025-04-22T13:00:00"),
      evenings: false,
    };
    return {
      data: {
        type: "station-closure",
        title: "Glenferrie station closed",
        description:
          "Glenferrie station will be affected by temporary closure from 8pm Friday 4 April to 4am Tuesday 22 April 2025, due to maintenance works.",
        calendar: toCalendarData(disruption, app.time.now()),
        link: "http://ptv.vic.gov.au/live-travel-updates/",
      },
      backHref,
    };
  }

  if (id === "4") {
    const disruption = {
      evenings: true,
      from: new Date("2025-03-16T10:30:00Z"),
      to: new Date("2025-03-19T12:59:59Z"),
    };
    return {
      data: {
        type: "altered-route",
        title:
          "Trains terminate and originate at Southern Cross on the Sunbury line",
        description:
          "Sunbury trains terminate and originate at Southern Cross from 9:30pm to last service each night, Sunday 16 March to Wednesday 19 March, due to maintenance works.",
        calendar: toCalendarData(disruption, app.time.now()),
        link: "http://ptv.vic.gov.au/live-travel-updates/article/craigieburn-and-sunbury-lines-trains-terminate-and-originate-at-southern-cross-930pm-to-last-service-each-night-from-sunday-16-march-to-wednesday-19-march-2025",
      },
      backHref,
    };
  }

  return { data: { type: "not-found" }, backHref };
}

// TEMPORARY: While we're bridging the gap between the demo data and real
// disruptions.
type Disruption = {
  from: Date;
  to: Date;
  evenings: boolean;
};
function toCalendarData(
  disruption: Disruption | Disruption[],
  now: Date,
): CalendarData {
  const array = Array.isArray(disruption) ? disruption : [disruption];
  const periods = array.map((x) =>
    x.evenings
      ? new EveningsOnlyDisruptionPeriod(x.from, new EndsExactly(x.to), 18)
      : new StandardDisruptionPeriod(x.from, new EndsExactly(x.to)),
  );

  return createCalendarData(periods, now);
}
