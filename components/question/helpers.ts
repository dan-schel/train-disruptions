import { ArrayField } from "@/components/question/array/ArrayField";
import { ArrayQuestionAdditionalProps } from "@/components/question/array/ArrayQuestion";
import { Field } from "@/components/question/common/field";
import { NumberField } from "@/components/question/number/NumberField";

export type BuildArrayHelperProps<Type> = Omit<
  ArrayQuestionAdditionalProps<Type>,
  "field"
> & {
  min?: number;
  max?: number;
};

export function buildInteger(p: { label: string; min?: number; max?: number }) {
  return new NumberField({
    label: p.label,
    validate: (value: number) => {
      if (!Number.isInteger(value)) {
        return "Must be an integer.";
      }
      if (p.min !== undefined && value < p.min) {
        return `Must be at least ${p.min}.`;
      }
      if (p.max !== undefined && value > p.max) {
        return `Must be at most ${p.max}.`;
      }
      return null;
    },
  });
}

export function buildArray<Type>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: Field<Type, any>,
  p: BuildArrayHelperProps<Type>,
) {
  return new ArrayField<Type>({
    ...p,
    field,
    validate: (value: Type[]) => {
      if (p.min !== undefined && value.length < p.min) {
        return { error: `Must have at least ${p.min} items.` };
      }
      if (p.max !== undefined && value.length > p.max) {
        return { error: `Must have at most ${p.max} items.` };
      }
      return p.validate?.(value) ?? null;
    },
  });
}
