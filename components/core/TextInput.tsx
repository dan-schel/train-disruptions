import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import clsx from "clsx";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { label, error, ...rest } = props;

    return (
      <Column className="group gap-2">
        {label && (
          <label htmlFor={props.id}>
            <Text style="subtitle">{label}</Text>
          </label>
        )}
        <input
          ref={ref}
          {...rest}
          className={clsx(
            "h-10 rounded border-2 bg-slate-200/10 p-2 focus-visible:outline-none",
            error
              ? "border-red-400 group-hover:border-red-500"
              : "border-action-secondary group-hover:border-slate-300",
          )}
        />
        {error && <Text style="input-error">{error}</Text>}
      </Column>
    );
  },
);

TextInput.displayName = "Input";
