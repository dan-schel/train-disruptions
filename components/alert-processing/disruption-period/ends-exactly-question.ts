import { q } from "@/components/alert-processing/question";

export const endsExactlyQuestion = q.object({
  date: q.date({
    label: "The date/time that the disruption ends",
  }),
});
