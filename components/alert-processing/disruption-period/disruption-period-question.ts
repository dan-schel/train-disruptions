import { eveningsOnlyDisruptionPeriodQuestion } from "@/components/alert-processing/disruption-period/evenings-only-disruption-period-question";
import { standardDisruptionPeriodQuestion } from "@/components/alert-processing/disruption-period/standard-disruption-period-question";
import { q } from "@/components/alert-processing/question";

export const disruptionPeriodQuestion = q.discriminatedUnion(
  "type",
  "The disruption occurs...",
  {
    standard: standardDisruptionPeriodQuestion,
    "evenings-only": eveningsOnlyDisruptionPeriodQuestion,
  },
  {
    standard: "Continuously",
    "evenings-only": "During the evenings only",
  },
);
