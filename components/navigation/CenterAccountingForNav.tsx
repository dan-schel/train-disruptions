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

        // In mobile view, render 2rem higher than the center to account for the
        // 4rem (16 Tailwind units) high mobile nav bar.
        "top-[calc((100%---spacing(16))*0.5)]",

        // In desktop view, render 1.5rem higher than the center to account for
        // the 3rem (12 Tailwind units) high mobile nav bar.
        "md:top-[calc((100%+--spacing(12))*0.5)]",

        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
