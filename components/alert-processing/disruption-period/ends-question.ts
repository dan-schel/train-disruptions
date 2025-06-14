import { endsApproximatelyQuestion } from "@/components/alert-processing/disruption-period/ends-approximately-question";
import { endsExactlyQuestion } from "@/components/alert-processing/disruption-period/ends-exactly-question";
import { q } from "@/components/alert-processing/question";

export const endsQuestion = q.discriminatedUnion("type", {
  "ends-approximately": endsApproximatelyQuestion,
  "ends-exactly": endsExactlyQuestion,
});
