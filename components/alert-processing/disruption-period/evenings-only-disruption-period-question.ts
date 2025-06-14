import { endsQuestion } from "@/components/alert-processing/disruption-period/ends-question";
import { q } from "@/components/alert-processing/question";

export const eveningsOnlyDisruptionPeriodQuestion = q.object({
  start: q.date({ label: "Starting" }),
  end: endsQuestion,
  startHourEachDay: q.integer({
    label: "Which hour each evening the disruption starts",
    min: 18,
    max: 23,
  }),
});
