import React from "react";
import clsx from "clsx";

export type RowProps = {
  children: React.ReactNode;
  className?: string;
  align?: "stretch" | "top" | "center" | "bottom";
  justify?: "left" | "center" | "right" | "space-between";
};

/**
 * Has props for align and justify. Use `classNames` for things like padding,
 * gap, background color, border, and drop shadows.
 *
 * If you're doing a more complex layout thing, e.g. media queries, write a
 * custom component over using this one.
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
