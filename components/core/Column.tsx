import React from "react";
import clsx from "clsx";

export type ColumnProps = {
  children: React.ReactNode;
  className?: string;
  align?: "stretch" | "left" | "center" | "right";
  justify?: "top" | "center" | "bottom" | "space-between";
};

/**
 * Has props for align and justify. Use `classNames` for things like padding,
 * gap, background color, border, and drop shadows.
 *
 * If you're doing a more complex layout thing, e.g. media queries, write a
 * custom component over using this one.
 */
export function Column(props: ColumnProps) {
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
    <div className={clsx("flex flex-col", justify, align, props.className)}>
      {props.children}
    </div>
  );
}
