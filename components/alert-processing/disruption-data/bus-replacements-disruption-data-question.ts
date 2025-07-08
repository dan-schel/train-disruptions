import { lineSectionQuestion } from "@/components/alert-processing/disruption-data/line-section-question";
import { q } from "@/components/question";

export const busReplacementsDisruptionDataQuestion = q.object({
  sections: q.array(lineSectionQuestion, {
    label: "Which section(s) of the network are replaced by buses?",
    min: 1,
  }),
});
