import React from "react";
import clsx from "clsx";

export type ColumnProps = {
  as?: "div" | "form" | "section" | "main" | "nav";
  children: React.ReactNode;
  className?: string;
  align?: "stretch" | "left" | "center" | "right";
  justify?: "top" | "center" | "bottom" | "space-between";
};

/**
 * Arranges items in a CSS Flexbox column.
 *
 * Rules:
 * - Don't abuse `className` for complex layouts, e.g. media queries.
 *
 * ([More info](https://github.com/dan-schel/train-disruptions/blob/master/docs/ui-conventions.md))
 */
export function Column(props: ColumnProps) {
  const Tag = props.as ?? "div";

  const align = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
    stretch: "items-stretch",
  }[props.align ?? "stretch"];

  const justify = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
    "space-between": "justify-between",
  }[props.justify ?? "top"];

  return (
    <Tag className={clsx("flex flex-col", justify, align, props.className)}>
      {props.children}
    </Tag>
  );
}
