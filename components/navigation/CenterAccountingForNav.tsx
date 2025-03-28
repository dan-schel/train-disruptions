import React from "react";
import clsx from "clsx";

export type CenterAccountingForNavProps = {
  className?: string;
  children: React.ReactNode;
};

export function CenterAccountingForNav(props: CenterAccountingForNavProps) {
  return (
    <div
      className={clsx(
        "fixed left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu",

        // Center on the page, excluding the space used by the mobile nav bar
        // (--spacing(16)).
        "top-[calc((100%---spacing(16))*0.5)]",

        // Center on the page, excluding the space used by the desktop nav bar
        // (--spacing(12)).
        "md:top-[calc((100%+--spacing(12))*0.5)]",

        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
