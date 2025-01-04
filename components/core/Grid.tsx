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
 * Arranges items in a CSS Grid.
 *
 * Rules:
 * - Don't abuse `className` for complex layouts, e.g. media queries.
 *
 * ([More info](https://github.com/dan-schel/train-disruptions/blob/master/docs/ui-conventions.md))
 */
export function Grid(props: GridProps) {
  const areasString = props.areas
    ?.split(",")
    .map((area) => `"${area.trim()}"`)
    .join(" ");

  return (
    <div
      className={clsx(`grid`, props.className)}
      style={{
        gridTemplateColumns: props.columns,
        gridTemplateRows: props.rows,
        gridTemplateAreas: areasString,
      }}
    >
      {props.children}
    </div>
  );
}
