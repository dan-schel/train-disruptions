import {
  buildString,
  buildNumber,
  buildDate,
  buildEnum,
  buildObject,
  buildDiscriminatedUnion,
} from "@/components/alert-processing/question/field-types";
import { buildInteger } from "@/components/alert-processing/question/helpers";

export const q = {
  string: buildString,
  number: buildNumber,
  integer: buildInteger,
  date: buildDate,
  enum: buildEnum,
  object: buildObject,
  discriminatedUnion: buildDiscriminatedUnion,
};

export { Questionaire } from "@/components/alert-processing/question/Questionaire";
