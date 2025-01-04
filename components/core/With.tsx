import React from "react";
import clsx from "clsx";

export type WithProps = {
  children: React.ReactElement;
  className?: string;
  flexGrow?: string;
  gridColumn?: string;
  gridRow?: string;
  gridArea?: string;
};

/**
 * Designed to be used when:
 * - You need to add margin to a component (and can't use gap in its parent).
 * - You need to set flex-grow on a component.
 * - You need to set the grid column/row/area of a component.
 *
 * Think twice before using it for something else.
 */
export function With(props: WithProps) {
  const child = React.Children.only(props.children);

  // Using cloneElement is dodgy, but better than wrapping it inside a useless
  // div, which has to act invisible to the layout logic.
  return React.cloneElement(child, {
    className: clsx(child.props.className, props.className),
    style: {
      ...child.props.style,
      flexGrow: props.flexGrow,
      gridColumn: props.gridColumn,
      gridRow: props.gridRow,
      gridArea: props.gridArea,
    },
  });
}
