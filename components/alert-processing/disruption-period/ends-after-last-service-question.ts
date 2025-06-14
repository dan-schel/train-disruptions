import { q } from "@/components/alert-processing/question";
import { isValid } from "date-fns";

export const endsAfterLastServiceQuestion = q.object(
  {
    year: q.number({
      label: "Year",
    }),
    month: q.number({
      label: "Month",
    }),
    day: q.number({
      label: "Day",
    }),
  },
  (input) => {
    // TODO: This isValid() function doesn't help in the slightest!
    if (!isValid(new Date(input.year, input.month - 1, input.day))) {
      return {
        error: "Not a valid date",
        questionsToInvalidate: ["day"],
      };
    }
    return null;
  },
);
