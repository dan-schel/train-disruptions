import { endsQuestion } from "@/components/alert-processing/disruption-period/ends-question";
import { q } from "@/components/alert-processing/question";

export const standardDisruptionPeriodQuestion = q.object({
  start: q.date({ label: "Starts" }),
  end: endsQuestion,
});
