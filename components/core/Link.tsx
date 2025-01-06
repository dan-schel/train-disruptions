import React from "react";
import { Action } from "./Button";

export type LinkProps = {
  children: React.ReactNode;
} & Action;

export function Link(props: LinkProps) {
  if (props.href != null) {
    return (
      <a className="inline text-blue-700 underline" href={props.href}>
        {props.children}
      </a>
    );
  } else {
    // Using <a> instead of <span> (doesn't support tab navigation) and <button>
    // (doesn't do text wrapping or highlighting).
    return (
      <a
        className="inline text-blue-700 underline"
        href="#"
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }
}
