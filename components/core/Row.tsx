import React from "react";
import clsx from "clsx";

export type RowProps = {
  children: React.ReactNode;
  className?: string;
  align?: "stretch" | "top" | "center" | "bottom";
  justify?: "left" | "center" | "right" | "space-between";
};

/**
 * Arranges items in a CSS Flexbox row.
 *
 * Rules:
 * - Don't abuse `className` for complex layouts, e.g. media queries.
 *
 * ([More info](https://github.com/dan-schel/train-disruptions/blob/master/docs/ui-conventions.md))
 */
export function Row(props: RowProps) {
  const align = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
    stretch: "items-stretch",
  }[props.align ?? "stretch"];

  const justify = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    "space-between": "justify-between",
  }[props.justify ?? "left"];

  return (
    <div className={clsx("flex flex-row", justify, align, props.className)}>
      {props.children}
    </div>
  );
}
