import { DateField } from "@/components/alert-processing/question/date/DateField";
import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/date/DateQuestion";
import { DiscriminatedUnionField } from "@/components/alert-processing/question/discriminated-union/DiscriminatedUnionField";
import {
  AnyDiscriminatedUnionConfig,
  TypesWithinUnion,
} from "@/components/alert-processing/question/discriminated-union/types";
import { EnumField } from "@/components/alert-processing/question/enum/EnumField";
import { EnumQuestionAdditionalProps } from "@/components/alert-processing/question/enum/EnumQuestion";
import { NumberField } from "@/components/alert-processing/question/number/NumberField";
import { NumberQuestionAdditionalProps } from "@/components/alert-processing/question/number/NumberQuestion";
import { ObjectField } from "@/components/alert-processing/question/object/ObjectField";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
} from "@/components/alert-processing/question/object/types";
import { StringField } from "@/components/alert-processing/question/string/StringField";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/string/StringQuestion";

export function buildString(p: StringQuestionAdditionalProps) {
  return new StringField(p);
}

export function buildNumber(p: NumberQuestionAdditionalProps) {
  return new NumberField(p);
}

export function buildDate(p: DateQuestionAdditionalProps) {
  return new DateField(p);
}

export function buildEnum<T extends string>(p: EnumQuestionAdditionalProps<T>) {
  return new EnumField(p);
}

export function buildObject<Config extends AnyObjectConfig>(
  config: Config,
  validator?: ObjectValidateFunction<Config>,
) {
  return new ObjectField<Config>({
    config,
    validate: validator ?? (() => null),
  });
}

export function buildDiscriminatedUnion<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
>(
  discriminator: Discriminator,
  typeQuestion: string,
  config: Config,
  typeFormatting: Record<TypesWithinUnion<Config>, string>,
) {
  return new DiscriminatedUnionField<Discriminator, Config>({
    discriminator,
    config,
    typeQuestion,
    typeFormatting,
  });
}
