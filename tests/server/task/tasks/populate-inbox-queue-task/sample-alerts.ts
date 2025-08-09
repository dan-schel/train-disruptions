import { Alert } from "@/server/data/alert/alert";
import { AlertData } from "@/server/data/alert/alert-data";
import { PtvAlert } from "@/server/alert-source/ptv-alert";

export const ptvAlert1: PtvAlert = {
  id: 333750,
  title:
    "Sunbury Line: Buses replace trains from 1am Saturday 26 April to last service Sunday 27 April 2025",
  url: "http://ptv.vic.gov.au/live-travel-updates/article/sunbury-line-buses-replace-trains-from-1am-saturday-26-april-to-last-service-sunday-27-april-2025",
  description:
    "Buses replace trains between North Melbourne and Sunbury from 1am Saturday 26 April to last service Sunday 27 April, due to Metro Tunnel works.",
  lastUpdated: "2025-04-25T20:26:02Z",
  fromDate: "2025-04-25T15:00:00Z",
  toDate: "2025-04-27T17:00:00Z",
  routeIds: [14],
  stopIds: [],
};

export const ptvAlert2: PtvAlert = {
  id: 327738,
  title:
    "Due to construction works, customers at Hastings Station will not be able to use myki devices to Touch on / Touch off and perform Top ups until further notice.",
  url: "http://ptv.vic.gov.au/live-travel-updates/",
  description:
    "Due to construction works, customers at Hastings Station will not be able to use myki devices to Touch on / Touch off and perform Top ups until further notice.",
  lastUpdated: "2024-12-25T10:15:39Z",
  fromDate: "2024-12-25T10:08:00Z",
  toDate: null,
  routeIds: [13],
  stopIds: [1088],
};

export const ptvAlert3: PtvAlert = {
  id: 335425,
  title:
    "Delays up to 10 minutes due to an operational issue in the Malvern area.",
  url: "http://ptv.vic.gov.au/live-travel-updates/",
  description:
    "Delays up to 10 minutes due to an operational issue in the Malvern area.",
  lastUpdated: "2024-12-25T10:15:39Z",
  fromDate: "2024-12-25T10:08:00Z",
  toDate: null,
  routeIds: [6],
  stopIds: [],
};

export const ptvAlert4: PtvAlert = {
  id: 336762,
  title:
    "Frankston Line: Buses replace trains from 10:45pm to last service, Thursday 26 June 2025",
  url: "http://ptv.vic.gov.au/live-travel-updates/article/frankston-line-buses-replace-trains-from-8-30pm-to-last-service-thursday-26-june-2025",
  description:
    "Buses replace trains between South Yarra and Moorabbin from 10:45pm to last service, Thursday 26 June, due to works.",
  lastUpdated: "2025-06-13T12:02:08Z",
  fromDate: "2025-06-26T12:45:00Z",
  toDate: "2025-06-26T17:00:00Z",
  routeIds: [6],
  stopIds: [],
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
