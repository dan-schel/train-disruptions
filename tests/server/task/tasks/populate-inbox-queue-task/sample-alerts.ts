import { Alert, AlertData } from "@/server/data/alert";
import { Disruption } from "@/types/disruption";

export const ptvDisruption1: Disruption = {
  disruption_id: 333750,
  title:
    "Sunbury Line: Buses replace trains from 1am Saturday 26 April to last service Sunday 27 April 2025",
  url: "http://ptv.vic.gov.au/live-travel-updates/article/sunbury-line-buses-replace-trains-from-1am-saturday-26-april-to-last-service-sunday-27-april-2025",
  description:
    "Buses replace trains between North Melbourne and Sunbury from 1am Saturday 26 April to last service Sunday 27 April, due to Metro Tunnel works.",
  disruption_status: "Current",
  disruption_type: "Planned Works",
  published_on: "2025-04-10T10:39:03Z",
  last_updated: "2025-04-25T20:26:02Z",
  from_date: "2025-04-25T15:00:00Z",
  to_date: "2025-04-27T17:00:00Z",
  routes: [
    {
      route_type: 0,
      route_id: 14,
      route_name: "Sunbury",
      route_number: "",
      route_gtfs_id: "2-SUY",
      direction: null,
    },
  ],
  stops: [],
  colour: "#ffd500",
  display_on_board: true,
  display_status: true,
};

export const ptvDisruption2: Disruption = {
  disruption_id: 327738,
  title:
    "Due to construction works, customers at Hastings Station will not be able to use myki devices to Touch on / Touch off and perform Top ups until further notice.",
  url: "http://ptv.vic.gov.au/live-travel-updates/",
  description:
    "Due to construction works, customers at Hastings Station will not be able to use myki devices to Touch on / Touch off and perform Top ups until further notice.",
  disruption_status: "Current",
  disruption_type: "Power outage",
  published_on: "2024-12-25T10:15:38Z",
  last_updated: "2024-12-25T10:15:39Z",
  from_date: "2024-12-25T10:08:00Z",
  to_date: null,
  routes: [
    {
      route_type: 0,
      route_id: 13,
      route_name: "Stony Point",
      route_number: "",
      route_gtfs_id: "2-STY",
      direction: null,
    },
  ],
  stops: [
    {
      stop_id: 1088,
      stop_name: "Hastings ",
    },
  ],
  colour: "#ffd500",
  display_on_board: false,
  display_status: false,
};

export const ptvDisruption3: Disruption = {
  disruption_id: 335425,
  title:
    "Delays up to 10 minutes due to an operational issue in the Malvern area.",
  url: "http://ptv.vic.gov.au/live-travel-updates/",
  description:
    "Delays up to 10 minutes due to an operational issue in the Malvern area.",
  disruption_status: "Current",
  disruption_type: "Minor Delays",
  published_on: "2024-12-25T10:15:38Z",
  last_updated: "2024-12-25T10:15:39Z",
  from_date: "2024-12-25T10:08:00Z",
  to_date: null,
  routes: [
    {
      route_type: 0,
      route_id: 6,
      route_name: "Frankston",
      route_number: "",
      route_gtfs_id: "2-FKN",
      direction: null,
    },
  ],
  stops: [],
  colour: "#ffd500",
  display_on_board: false,
  display_status: false,
};

export const ptvDisruption4: Disruption = {
  disruption_id: 336762,
  title:
    "Frankston Line: Buses replace trains from 10:45pm to last service, Thursday 26 June 2025",
  url: "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
  description:
    "Buses replace trains between South Yarra and Moorabbin from 10:45pm to last service, Thursday 26 June, due to works.",
  disruption_status: "Planned",
  disruption_type: "Planned Works",
  published_on: "2025-06-01T10:41:24Z",
  last_updated: "2025-06-13T12:02:08Z",
  from_date: "2025-06-26T12:45:00Z",
  to_date: "2025-06-26T17:00:00Z",
  routes: [
    {
      route_type: 0,
      route_id: 6,
      route_name: "Frankston",
      route_number: "",
      route_gtfs_id: "2-FKN",
      direction: null,
    },
  ],
  stops: [],
  colour: "#ffd500",
  display_on_board: false,
  display_status: false,
};

export const alert1 = new Alert(
  "333750",
  new AlertData(
    "Sunbury Line: Buses replace trains from 1am Saturday 26 April to last service Sunday 27 April 2025",
    "Buses replace trains between North Melbourne and Sunbury from 1am Saturday 26 April to last service Sunday 27 April, due to Metro Tunnel works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/sunbury-line-buses-replace-trains-from-1am-saturday-26-april-to-last-service-sunday-27-april-2025",
    new Date("2025-04-25T15:00:00Z"),
    new Date("2025-04-27T17:00:00Z"),
    [14],
    [],
  ),
  null,
  new Date("2025-05-01T00:00:00Z"),
  null,
  null,
  false,
  null,
);

export const alert2 = new Alert(
  "327738",
  new AlertData(
    "Due to construction works, customers at Hastings Station will not be able to use myki devices to Touch on / Touch off and perform Top ups until further notice.",
    "Due to construction works, customers at Hastings Station will not be able to use myki devices to Touch on / Touch off and perform Top ups until further notice.",
    "http://ptv.vic.gov.au/live-travel-updates/",
    new Date("2024-12-25T10:08:00Z"),
    null,
    [13],
    [1088],
  ),
  null,
  new Date("2025-01-01T00:00:00Z"),
  null,
  null,
  false,
  null,
);

export const alert3 = new Alert(
  "335425",
  new AlertData(
    "Delays up to 10 minutes due to an operational issue in the Malvern area.",
    "Delays up to 10 minutes due to an operational issue in the Malvern area.",
    "http://ptv.vic.gov.au/live-travel-updates/",
    new Date("2024-12-25T10:08:00Z"),
    null,
    [6],
    [],
  ),
  null,
  new Date("2025-01-01T00:00:00Z"),
  new Date("2025-01-01T00:00:00Z"),
  null,
  false,
  null,
);

// State = "new"
export const alert4 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 8.30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 8.30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T10:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  null,
  new Date("2024-12-30T00:00:00Z"),
  null,
  null,
  false,
  null,
);

// State = "ignored"
export const alert5 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 8.30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 8.30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T10:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  null,
  new Date("2024-12-30T00:00:00Z"),
  new Date("2024-12-30T00:00:00Z"),
  null,
  true,
  null,
);

// State = "processed"
export const alert6 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 8.30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 8.30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T10:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  null,
  new Date("2024-12-30T00:00:00Z"),
  new Date("2024-12-30T00:00:00Z"),
  null,
  false,
  null,
);

// State = "updated"
export const alert7 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 8.30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 8.30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T10:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  new AlertData(
    "Frankston Line: Buses replace trains from 10:30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 10:30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T12:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  new Date("2024-12-30T00:00:00Z"),
  new Date("2024-12-31T00:00:00Z"),
  new Date("2024-12-31T00:00:00Z"),
  false,
  null,
);

// Expected result
export const alert8 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 10:45pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 10:45pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T12:45:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  null,
  new Date("2025-01-01T00:00:00Z"),
  new Date("2025-01-01T00:00:00Z"),
  null,
  false,
  null,
);

// Expected "updated" result
export const alert9 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 10:45pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 10:45pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T12:45:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  new AlertData(
    "Frankston Line: Buses replace trains from 10:30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 10:30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T12:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  new Date("2025-01-01T00:00:00Z"),
  new Date("2025-01-01T00:00:00Z"),
  new Date("2024-12-31T00:00:00Z"),
  false,
  null,
);

// Already up to date
export const alert10 = new Alert(
  "336762",
  new AlertData(
    "Frankston Line: Buses replace trains from 8.30pm to last service, Thursday 26 June 2025",
    "Buses replace trains between South Yarra and Moorabbin from 8.30pm to last service, Thursday 26 June, due to works.",
    "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
    new Date("2025-06-26T10:30:00Z"),
    new Date("2025-06-26T17:00:00Z"),
    [6],
    [],
  ),
  null,
  new Date("2024-12-30T00:00:00Z"),
  new Date("2025-07-01T00:00:00Z"),
  null,
  false,
  null,
);
