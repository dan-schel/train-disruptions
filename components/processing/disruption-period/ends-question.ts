import { endsAfterLastServiceQuestion } from "@/components/processing/disruption-period/ends-after-last-service-question";
import { endsApproximatelyQuestion } from "@/components/processing/disruption-period/ends-approximately-question";
import { endsExactlyQuestion } from "@/components/processing/disruption-period/ends-exactly-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { EndsInput } from "@/shared/schemas/common/disruption-period-input";

export const endsQuestion = q.discriminatedUnion(
  "type",
  "And ending...",
  {
    "ends-exactly": endsExactlyQuestion,
    "ends-approximately": endsApproximatelyQuestion,
    "ends-after-last-service": endsAfterLastServiceQuestion,
    "ends-when-alert-ends": q.object({}),
    "ends-never": q.object({}),
  },
  {
    "ends-exactly": "At an exact time",
    "ends-approximately": 'At an approximate time (e.g. "late May")',
    "ends-after-last-service": '"After last service" on a particular day',
    "ends-when-alert-ends": "When this alert ends (automatic)",
    "ends-never": "Never (currently unknown)",
  },
) satisfies AnyField<EndsInput>;
