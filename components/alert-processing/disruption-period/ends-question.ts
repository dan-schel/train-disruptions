import { endsAfterLastServiceQuestion } from "@/components/alert-processing/disruption-period/ends-after-last-service-question";
import { endsApproximatelyQuestion } from "@/components/alert-processing/disruption-period/ends-approximately-question";
import { endsExactlyQuestion } from "@/components/alert-processing/disruption-period/ends-exactly-question";
import { q } from "@/components/alert-processing/question";

export const endsQuestion = q.discriminatedUnion("type", {
  "ends-after-last-service": endsAfterLastServiceQuestion,
  "ends-approximately": endsApproximatelyQuestion,
  "ends-exactly": endsExactlyQuestion,
  "ends-never": q.object({}), // TODO: Currently broken.
  "ends-when-alert-ends": q.object({}), // TODO: Currently broken.
});
