import { endsQuestion } from "@/components/alert-processing/disruption-period/ends-question";
import { q } from "@/components/question";

export const standardDisruptionPeriodQuestion = q.object({
  start: q.date({ label: "Starting" }),
  end: endsQuestion,
});
