import { isAfter } from "date-fns";
import { q } from "@/components/alert-processing/question";

export const endsApproximatelyQuestion = q.object(
  {
    displayText: q.string({
      label: "The disruption ends in...",
    }),
    earliest: q.date({
      label: "Earliest interpretable date",
    }),
    latest: q.date({
      label: "Latest interpretable date",
    }),
  },
  (input) => {
    if (!isAfter(input.latest, input.earliest)) {
      return {
        error: "Latest date must be after earliest date",
        questionsToInvalidate: ["latest"],
      };
    }
    return null;
  },
);
