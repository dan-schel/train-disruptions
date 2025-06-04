import { Field } from "@/components/alert-processing/question/type/complex/object-builder/types";
import {
  DateQuestion,
  DateQuestionAdditionalProps,
} from "@/components/alert-processing/question/type/DateQuestion";
import {
  EnumQuestion,
  EnumQuestionAdditionalProps,
} from "@/components/alert-processing/question/type/EnumQuestion";
import {
  StringQuestion,
  StringQuestionAdditionalProps,
} from "@/components/alert-processing/question/type/StringQuestion";

// TODO: [DS] End goal. A q.object() function that can be passed to some sort of
// <Questionaire> component (which can also accept a q.discriminatedUnion()
// value, etc.).

// TODO: [DS] Can these return a class which knows how to render the component
// so we can delete Subquestion.tsx and avoid all the `as any` stuff going on?

function buildString(
  props: StringQuestionAdditionalProps,
): Field<string, StringQuestionAdditionalProps> {
  return {
    type: StringQuestion,
    props,
  };
}

function buildDate(
  props: DateQuestionAdditionalProps,
): Field<Date, DateQuestionAdditionalProps> {
  return {
    type: DateQuestion,
    props,
  };
}

function buildEnum<U extends string>(
  props: EnumQuestionAdditionalProps<U>,
): Field<U, EnumQuestionAdditionalProps<U>> {
  return {
    type: EnumQuestion,
    props,
  };
}

export const q = {
  string: buildString,
  date: buildDate,
  enum: buildEnum,
};
