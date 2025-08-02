import { buildLineSection } from "@/components/processing/custom-questions/line-section/LineSectionField";
import { buildLine } from "@/components/processing/custom-questions/line/LineField";
import { buildStation } from "@/components/processing/custom-questions/station/StationField";
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
  station: buildStation,
  lineSection: buildLineSection,
};

export { Questionnaire } from "@/components/question/Questionnaire";
