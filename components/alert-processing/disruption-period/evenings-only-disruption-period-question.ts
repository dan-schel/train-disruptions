import { endsQuestion } from "@/components/alert-processing/disruption-period/ends-question";
import { q } from "@/components/alert-processing/question";

export const eveningsOnlyDisruptionPeriodQuestion = q.object({
  start: q.date({ label: "Starts" }),
  end: endsQuestion,
  startHourEachDay: q.number({ label: "Start hour each day" }),
});
