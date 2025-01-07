import React from "react";
import type { SVGProps } from "react";

// Example of an iconify icon. Can remove once the first real icon is added.

export function RiAddCircleLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
      ></path>
    </svg>
  );
}
