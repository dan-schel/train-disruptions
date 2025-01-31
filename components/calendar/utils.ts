import { daysInWeek } from "date-fns/constants";
import { Disruption } from "./Calendar";
import {
  addDays,
  differenceInCalendarDays,
  eachMonthOfInterval,
  endOfDay,
  getDaysInMonth,
  getHours,
  isSameDay,
  isWithinInterval,
  max,
  min,
  startOfDay,
} from "date-fns";

const SixPM = 18;
const maxDates = 28;
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

/**
 * Gets the column to start rendering from based on the day of the week
 */
export const column = (date: Date) => startPosition[date.getDay() % daysInWeek];

const getRange = (disruptions: Disruption | Disruption[]) => {
  const isArray = Array.isArray(disruptions);
  const toDates = isArray ? disruptions.map((d) => d.to) : [disruptions.to];

  const fromDates = isArray
    ? disruptions.map((d) => d.from).concat(new Date())
    : [disruptions.from];

  return { startDate: min(fromDates), endDate: max(toDates) };
};

/**
 * Returns styling based of if a disruption is present on a date.
 * @param date Date to check for disruptions
 * @param disruptions List of disruptions
 * @returns `string` className
 */
export const isThereDisruption = (
  date: Date,
  disruptions: Disruption | Disruption[],
) => {
  const _disruptions = Array.isArray(disruptions) ? disruptions : [disruptions];
  for (const _disruption of _disruptions) {
    const start = startOfDay(_disruption.from);
    const end = endOfDay(_disruption.to);

    if (isWithinInterval(date, { start, end })) {
      // Handle situations where bus replacements occur in the evening, only on the first day
      if (
        isSameDay(date, _disruption.from) &&
        getHours(_disruption.from) >= SixPM
      ) {
        return disruption.night;
      }
      return _disruption.evenings ? disruption.night : disruption.buses;
    }
  }

  return disruption.trains;
};

/**
 * Get array of objects containing the date to start from and the number of days to render in that month
 * @param disruptions List of disruptions
 */
export const getMonthsToRender = (disruptions: Disruption | Disruption[]) => {
  const isArray = Array.isArray(disruptions);
  const { startDate, endDate } = getRange(disruptions);

  // Get the number of cells to render
  const datesToRender = isArray
    ? maxDates - startDate.getDay()
    : differenceInCalendarDays(endDate, startDate) + // Get days between the two dates
      (daysInWeek - endDate.getDay()); // Pad with additional dates to fill out the rest of the row

  // Get array of objects containing the date to start from and the number of days to render in that month
  return eachMonthOfInterval({
    start: startDate,
    end: isArray ? endDate : addDays(startDate, datesToRender),
  })
    .map((date, i) => {
      return {
        start: isInitial(i) ? startDate : date,
        days:
          getDaysInMonth(date) - (isInitial(i) ? startDate.getDate() - 1 : 0), // Gets days in the month, removes dates in the past
      };
    })
    .map((x, i, a) => ({
      ...x,
      days: Math.min(
        x.days,
        datesToRender -
          a.slice(0, i).reduce((prev, curr) => prev + curr.days, 0), // Date slots consumed by the previous months
      ),
    }));
};
