import clsx from "clsx";
import React from "react";

// TODO: Codify routes rather than allowing any string.
export type Action =
  | { onClick: () => void; href?: undefined; submit?: undefined }
  | {
      onClick?: undefined;
      href: string;
      target?: React.HTMLAttributeAnchorTarget;
      submit?: undefined;
    }
  | { onClick?: undefined; href?: undefined; submit: true };

export function extractAction(props: Action): Action {
  if (props.onClick != null) {
    return { onClick: props.onClick };
  } else if (props.href != null) {
    return { href: props.href, target: props.target };
  } else if (props.submit === true) {
    return { submit: true };
  } else {
    throw new Error("Invalid action");
  }
}

export type ButtonProps = {
  children: React.ReactElement;
  alt?: string;
  hidden?: boolean;
} & Action;

/**
 * A clickable element (supports `onClick` or `href`).
 *
 * Rules:
 * - Are you sure you don't want `<SimpleButton>`?
 * - Child elements should use `group-hover` and `group-active` for styling,
 *   over `hover` and `active`.
 *
 * ([More info](https://github.com/dan-schel/is-it-buses/blob/master/docs/ui-conventions.md))
 */
export function Button(props: ButtonProps) {
  if (props.onClick != null || props.submit) {
    const type = props.submit === true ? "submit" : "button";
    return (
      <button
        className={clsx("group grid", { hidden: props.hidden })}
        onClick={props.onClick}
        type={type}
        title={props.alt}
      >
        {props.children}
      </button>
    );
  } else {
    return (
      <a
        className={clsx("group grid", { hidden: props.hidden })}
        href={props.href}
        title={props.alt}
        target={props.target}
      >
        {props.children}
      </a>
    );
  }
}
