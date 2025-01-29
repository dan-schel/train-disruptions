import { daysInWeek } from "date-fns/constants";
import { Disruption } from "./Calendar";
import {
  endOfDay,
  isThisWeek,
  isWithinInterval,
  max,
  min,
  startOfDay,
} from "date-fns";

export const maxDates = 28;
const startPosition = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
export const disruption = {
  buses: "bg-orange-600 text-gray-100",
  night: "bg-gray-200 border-[3px] border-orange-600",
  trains: "bg-gray-200",
};

export const isInitial = (i: number) => i === 0;
export const column = (date: Date) => startPosition[date.getDay() % daysInWeek];

export const getRange = (disruptions: Disruption[]) => {
  const toDates = disruptions.map((d) => d.to);
  const endDate = max(toDates);

  const fromDates = disruptions.map((d) => d.from);
  const startDate = isThisWeek(min(fromDates)) ? new Date() : min(fromDates);

  return { startDate, endDate };
};

export const isThereDisruption = (date: Date, disruptions: Disruption[]) => {
  for (const _disruption of disruptions) {
    const start = startOfDay(_disruption.from);
    const end = endOfDay(_disruption.to);

    if (isWithinInterval(date, { start, end })) {
      return _disruption.evenings ? disruption.night : disruption.buses;
    }
  }

  return disruption.trains;
};
