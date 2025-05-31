import React from "react";

export type DateInputProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
};

export function DateInput(props: DateInputProps) {
  return (
    <input
      type="datetime-local"
      value={toLocalDateString(props.value)}
      onChange={(e) => {
        const value = e.target.value;
        props.onChange(value ? new Date(value) : null);
      }}
      // TODO: [DS] Temporary!
      className="border-switch focus-within:border-accent w-full appearance-none rounded-sm border-2 outline-none"
    />
  );
}

function toLocalDateString(date: Date | null): string {
  if (date == null) return "";

  const copy = new Date(date.getTime());
  copy.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return copy.toISOString().slice(0, 16);
}
