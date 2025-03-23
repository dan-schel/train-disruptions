import React from "react";

export type MarqueeProps = {
  children: React.ReactNode;
};

export function Marquee(props: MarqueeProps) {
  return (
    <div className="overflow-hidden">
      <div className="_marquee">{props.children}</div>
    </div>
  );
}
