import React from "react";
import clsx from "clsx";

export type WithProps = {
  children: React.ReactElement;
  className?: string;
  flexGrow?: string;
  gridColumn?: string | number;
  gridRow?: string | number;
  gridArea?: string;
};

/**
 * Applies additional layout props to the inner element.
 *
 * Rules:
 * - Great for setting flex grow, or grid columns/row/area.
 * - This is a last resort for setting margin. Consider alternatives.
 *
 * ([More info](https://github.com/dan-schel/train-disruptions/blob/master/docs/ui-conventions.md))
 */
export function With(props: WithProps) {
  const child = React.Children.only(props.children);

  return (
    <div
      className={clsx("grid", props.className)}
      style={{
        flexGrow: props.flexGrow,
        gridColumn: props.gridColumn,
        gridRow: props.gridRow,
        gridArea: props.gridArea,
      }}
    >
      {child}
    </div>
  );
}
