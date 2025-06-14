import { ObjectField } from "@/components/alert-processing/question/object/ObjectField";
import { ObjectValue } from "@/components/alert-processing/question/object/types";

export type AnyDiscriminatedUnionConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: ObjectField<any>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractObjectConfig<Field extends ObjectField<any>> =
  Field extends ObjectField<infer Config> ? Config : never;

// TODO: Maybe this can be simplified, but it seems to work!
export type DiscriminatedUnionValue<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
> = {
  [K in keyof Config]: { [D in Discriminator]: K } & ObjectValue<
    ExtractObjectConfig<Config[K]>
  >;
}[keyof Config];

export type SemiRawDiscriminatedUnionValue<
  Config extends AnyDiscriminatedUnionConfig,
> = {
  [K in keyof Config]: { type: K } & {
    value: ObjectValue<ExtractObjectConfig<Config[K]>> | null;
  };
}[keyof Config];

export type RawDiscriminatedUnionValue<
  Config extends AnyDiscriminatedUnionConfig,
> = SemiRawDiscriminatedUnionValue<Config> | { type: null };

export type TypesWithinUnion<Config extends AnyDiscriminatedUnionConfig> =
  keyof Config & string;
