import { DateField } from "@/components/question/date/DateField";
import { DateQuestionAdditionalProps } from "@/components/question/date/DateQuestion";
import { DiscriminatedUnionField } from "@/components/question/discriminated-union/DiscriminatedUnionField";
import {
  AnyDiscriminatedUnionConfig,
  TypesWithinUnion,
} from "@/components/question/discriminated-union/types";
import { EnumField } from "@/components/question/enum/EnumField";
import { EnumQuestionAdditionalProps } from "@/components/question/enum/EnumQuestion";
import { NumberField } from "@/components/question/number/NumberField";
import { NumberQuestionAdditionalProps } from "@/components/question/number/NumberQuestion";
import { ObjectField } from "@/components/question/object/ObjectField";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
} from "@/components/question/object/types";
import { StringField } from "@/components/question/string/StringField";
import { StringQuestionAdditionalProps } from "@/components/question/string/StringQuestion";

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
