import React from "react";

export type DateInputProps = {
  value: Date | null;
  onChange: (value: Date | null) => void;
};

export function DateInput(props: DateInputProps) {
  return (
    <input
      type="date"
      value={props.value ? props.value.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        const value = e.target.value;
        props.onChange(value ? new Date(value) : null);
      }}
    />
  );
}
