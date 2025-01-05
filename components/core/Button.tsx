import React from "react";

// TODO: [DS] Codify routes rather than allowing any string.
export type Action =
  | { onClick: () => void; href?: undefined; submit?: boolean }
  | { onClick?: undefined; href: string; submit?: undefined };

export function extractAction(props: Action): Action {
  if (props.onClick != null) {
    return { onClick: props.onClick, submit: props.submit };
  } else {
    return { href: props.href };
  }
}

export type ButtonProps = {
  children: React.ReactElement;
  alt?: string;
} & Action;

export function Button(props: ButtonProps) {
  if (props.onClick != null) {
    const type = props.submit === true ? "submit" : "button";
    return (
      <button
        className="group grid"
        onClick={props.onClick}
        type={type}
        title={props.alt}
      >
        {props.children}
      </button>
    );
  } else {
    return (
      <a className="group grid" href={props.href} title={props.alt}>
        {props.children}
      </a>
    );
  }
}
