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
  new Date("2025-01-01T00:00:00Z"),
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
