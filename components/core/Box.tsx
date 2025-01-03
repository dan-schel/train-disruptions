import React from "react";

export type BoxProps = {
  children: React.ReactElement;
  className?: string;
};

/**
 * Only recommended usage: Adding margin/padding to a component which doesn't
 * provide a mechanism to do so (where flex/grid gap doesn't suffice, of
 * course!).
 */
export function Box(props: BoxProps) {
  return <div className={props.className}>{props.children}</div>;
}
