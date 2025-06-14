import {
  buildString,
  buildNumber,
  buildDate,
  buildEnum,
  buildObject,
  buildDiscriminatedUnion,
} from "@/components/question/field-types";
import { buildInteger } from "@/components/question/helpers";

export const q = {
  string: buildString,
  number: buildNumber,
  integer: buildInteger,
  date: buildDate,
  enum: buildEnum,
  object: buildObject,
  discriminatedUnion: buildDiscriminatedUnion,
};

export { Questionaire } from "@/components/question/Questionaire";
