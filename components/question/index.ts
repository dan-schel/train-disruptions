import { buildLine } from "@/components/alert-processing/custom-questions/line/LineField";
import {
  buildString,
  buildNumber,
  buildDate,
  buildEnum,
  buildObject,
  buildDiscriminatedUnion,
} from "@/components/question/field-types";
import { buildArray, buildInteger } from "@/components/question/helpers";

export const q = {
  string: buildString,
  number: buildNumber,
  integer: buildInteger,
  date: buildDate,
  enum: buildEnum,
  object: buildObject,
  discriminatedUnion: buildDiscriminatedUnion,
  array: buildArray,
  line: buildLine,

  // TODO: [DS] Implement these properly!
  station: buildNumber,
  lineShapeNode: buildNumber,
};

export { Questionnaire } from "@/components/question/Questionnaire";
