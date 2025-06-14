import { DateField } from "@/components/alert-processing/question/date/DateField";
import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/date/DateQuestion";
import { EnumField } from "@/components/alert-processing/question/enum/EnumField";
import { EnumQuestionAdditionalProps } from "@/components/alert-processing/question/enum/EnumQuestion";
import { StringField } from "@/components/alert-processing/question/string/StringField";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/string/StringQuestion";

// TODO: [DS] End goal. A q.object() function that can be passed to some sort of
// <Questionaire> component (which can also accept a q.discriminatedUnion()
// value, etc.).

export const q = {
  string: (p: StringQuestionAdditionalProps) => new StringField(p),
  date: (p: DateQuestionAdditionalProps) => new DateField(p),
  enum: <T extends string>(p: EnumQuestionAdditionalProps<T>) =>
    new EnumField(p),
};
