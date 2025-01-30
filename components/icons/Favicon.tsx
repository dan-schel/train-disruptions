import React from "react";
import type { SVGProps } from "react";

export function Favicon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <rect
        width="15"
        height="15"
        x=".5"
        y=".5"
        fill="transparent"
        stroke="currentColor"
        rx="2"
        ry="2"
      />
      <path stroke="currentColor" d="m1 1 14 14m0-14L1 15" />
    </svg>
  );
}
