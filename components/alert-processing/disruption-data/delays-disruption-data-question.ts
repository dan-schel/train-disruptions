import { lineSectionQuestion } from "@/components/alert-processing/disruption-data/line-section-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { DelaysDisruptionDataInput } from "@/shared/schemas/alert-processing/disruption-data-input";

export const delaysDisruptionDataQuestion = q.object({
  stationId: q.station({
    label: "Around which station are the delays occurring?",
  }),
  delayInMinutes: q.integer({
    label: "Roughly how long (in minutes) are the delays expected to be?",
    min: 1,
  }),
  sections: q.array(lineSectionQuestion, {
    label: "Which section(s) of the network are impacted by delays?",
    min: 1,
  }),
}) satisfies AnyField<DelaysDisruptionDataInput>;
