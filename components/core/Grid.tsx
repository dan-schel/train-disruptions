import React from "react";
import clsx from "clsx";

export type GridProps = {
  children: React.ReactNode;
  className?: string;
  columns?: string;
  rows?: string;
  areas?: string;
};

/**
 * Has props for columns, rows, and areas. Use `classNames` for things like
 * padding, gap, background color, border, and drop shadows.
 *
 * If you're doing a more complex layout thing, e.g. media queries, write a
 * custom component over using this one.
 */
export function Grid(props: GridProps) {
  return (
    <div
      className={clsx(`grid`, props.className)}
      style={{
        gridTemplateColumns: props.columns,
        gridTemplateRows: props.rows,
        gridTemplateAreas: props.areas,
      }}
    >
      {props.children}
    </div>
  );
}
