import {
  DateField,
  EnumField,
  StringField,
} from "@/components/alert-processing/question/lib/field";
import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/type/DateQuestion";
import { EnumQuestionAdditionalProps } from "@/components/alert-processing/question/type/EnumQuestion";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/type/StringQuestion";

// TODO: [DS] End goal. A q.object() function that can be passed to some sort of
// <Questionaire> component (which can also accept a q.discriminatedUnion()
// value, etc.).

export const q = {
  string: (p: StringQuestionAdditionalProps) => new StringField(p),
  date: (p: DateQuestionAdditionalProps) => new DateField(p),
  enum: <T extends string>(p: EnumQuestionAdditionalProps<T>) =>
    new EnumField(p),
};
