import { NumberField } from "@/components/question/number/NumberField";

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
