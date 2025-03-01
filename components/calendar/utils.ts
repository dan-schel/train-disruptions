import { Disruption } from "./Calendar";
import { toZonedTime } from "date-fns-tz";
import { daysInWeek } from "date-fns/constants";
import {
  addDays,
  clamp,
  differenceInCalendarDays,
  eachMonthOfInterval,
  endOfDay,
  getDaysInMonth,
  getHours,
  getISODay,
  isSameDay,
  isWithinInterval,
  max,
  min,
  startOfDay,
} from "date-fns";

const SixPM = 18;
const maxDates = 28;
const startPosition = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];
export const IANAMelbourneTimezone = "Australia/Melbourne";
export const disruption = {
  buses: "bg-disruption text-white",
  night: "bg-gray-200 border-3 border-disruption",
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
    ? disruptions
        .map((d) => d.from)
        .concat(toZonedTime(new Date(), IANAMelbourneTimezone))
    : [disruptions.from];

  return {
    startDate: clamp(min(fromDates), {
      start: toZonedTime(new Date(), IANAMelbourneTimezone),
      end: max(toDates),
    }),
    endDate: max(toDates),
  };
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
    const start = startOfDay(
      toZonedTime(_disruption.from, IANAMelbourneTimezone),
    );
    const end = endOfDay(toZonedTime(_disruption.to, IANAMelbourneTimezone));

    if (isWithinInterval(date, { start, end })) {
      // Handle situations where bus replacements occur in the evening, only on the first day
      if (isSameDay(date, start) && getHours(_disruption.from) >= SixPM) {
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
    ? maxDates - getISODay(startDate) + 1
    : // Get days between the two dates
      differenceInCalendarDays(endDate, startDate) +
      // Pad with additional dates to fill out the rest of the row
      (daysInWeek - getISODay(endDate) + 1);

  return eachMonthOfInterval({
    start: startDate,
    end: isArray ? addDays(startDate, datesToRender) : endDate,
  })
    .map((date, i) => {
      return {
        start: isInitial(i) ? startDate : date,
        days:
          // Gets days in the month, removes dates in the past
          getDaysInMonth(date) - (isInitial(i) ? startDate.getDate() - 1 : 0),
      };
    })
    .map((x, i, a) => ({
      ...x,
      days: Math.min(
        x.days,
        datesToRender -
          // Date slots consumed by the previous months
          a.slice(0, i).reduce((prev, curr) => prev + curr.days, 0),
      ),
    }));
};
