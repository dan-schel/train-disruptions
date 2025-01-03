import React from "react";
import clsx from "clsx";

export type GridProps = {
  children: React.ReactNode;
  className?: string;
  columns?: string;
  rows?: string;
  areas?: string;
};

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
