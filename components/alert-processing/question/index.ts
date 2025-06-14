import { DateField } from "@/components/alert-processing/question/date/DateField";
import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/date/DateQuestion";
import { DiscriminatedUnionField } from "@/components/alert-processing/question/discriminated-union/DiscriminatedUnionField";
import { DiscriminatedUnionQuestionAdditionalProps } from "@/components/alert-processing/question/discriminated-union/DiscriminatedUnionQuestion";
import { AnyDiscriminatedUnionConfig } from "@/components/alert-processing/question/discriminated-union/types";
import { EnumField } from "@/components/alert-processing/question/enum/EnumField";
import { EnumQuestionAdditionalProps } from "@/components/alert-processing/question/enum/EnumQuestion";
import { ObjectField } from "@/components/alert-processing/question/object/ObjectField";
import { ObjectQuestionAdditionalProps } from "@/components/alert-processing/question/object/ObjectQuestion";
import { AnyObjectConfig } from "@/components/alert-processing/question/object/types";
import { StringField } from "@/components/alert-processing/question/string/StringField";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/string/StringQuestion";

export const q = {
  string: (p: StringQuestionAdditionalProps) => new StringField(p),
  date: (p: DateQuestionAdditionalProps) => new DateField(p),
  enum: <T extends string>(p: EnumQuestionAdditionalProps<T>) =>
    new EnumField(p),
  object: <Config extends AnyObjectConfig>(
    p: ObjectQuestionAdditionalProps<Config>,
  ) => new ObjectField<Config>(p),
  discriminatedUnion: <
    Discriminator extends string,
    Config extends AnyDiscriminatedUnionConfig,
  >(
    p: DiscriminatedUnionQuestionAdditionalProps<Discriminator, Config>,
  ) => new DiscriminatedUnionField<Discriminator, Config>(p),
};
