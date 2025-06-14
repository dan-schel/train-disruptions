import { DateField } from "@/components/alert-processing/question/date/DateField";
import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/date/DateQuestion";
import { DiscriminatedUnionField } from "@/components/alert-processing/question/discriminated-union/DiscriminatedUnionField";
import { AnyDiscriminatedUnionConfig } from "@/components/alert-processing/question/discriminated-union/types";
import { EnumField } from "@/components/alert-processing/question/enum/EnumField";
import { EnumQuestionAdditionalProps } from "@/components/alert-processing/question/enum/EnumQuestion";
import { ObjectField } from "@/components/alert-processing/question/object/ObjectField";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
} from "@/components/alert-processing/question/object/types";
import { StringField } from "@/components/alert-processing/question/string/StringField";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/string/StringQuestion";

function buildString(p: StringQuestionAdditionalProps) {
  return new StringField(p);
}

function buildDate(p: DateQuestionAdditionalProps) {
  return new DateField(p);
}

function buildEnum<T extends string>(p: EnumQuestionAdditionalProps<T>) {
  return new EnumField(p);
}

function buildObject<Config extends AnyObjectConfig>(
  config: Config,
  validator?: ObjectValidateFunction<Config>,
) {
  return new ObjectField<Config>({
    config,
    validate: validator ?? (() => null),
  });
}

function buildDiscriminatedUnion<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
>(discriminator: Discriminator, config: Config) {
  return new DiscriminatedUnionField<Discriminator, Config>({
    discriminator,
    config,
  });
}

export const q = {
  string: buildString,
  date: buildDate,
  enum: buildEnum,
  object: buildObject,
  discriminatedUnion: buildDiscriminatedUnion,
};
