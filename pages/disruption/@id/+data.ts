import { DataAsync } from "vike/types";

export { data };
export type Data = {
  station:
    | {
        to: string;
        from: string;
      }
    | string;

  disruption: {
    to: Date;
    from: Date;
    evenings: boolean;
  };
  backHref: string;
  link: string;
};

const data: DataAsync = async (pageContext): Promise<Data> => {
  const { urlParsed } = pageContext;

  // { from: "overview" } | { from: "line-x" }
  const from = urlParsed.search.from;

  return {
    station: {
      to: "Werribee",
      from: "North Melbourne",
    },
    disruption: {
      from: new Date("2025-02-04T10:45:00Z"),
      to: new Date("2025-02-06T12:59:59Z"),
      evenings: true,
    },
    link: "http://ptv.vic.gov.au/live-travel-updates/article/werribee-and-williamstown-lines-buses-replace-trains-from-840pm-to-last-service-each-night-tuesday-4-february-to-thursday-6-february-2025",
    backHref: from.startsWith("line") ? `/line/${from.split("-")[1]}` : "/",
  };
};
