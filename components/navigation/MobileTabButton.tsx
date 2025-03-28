import React from "react";

import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { Column } from "@/components/core/Column";

export type MobileTabButtonProps = {
  name: string;
  icon: React.ReactElement;
  iconFill: React.ReactElement;
  active: boolean;
  onClick: () => void;
};

export function MobileTabButton(props: MobileTabButtonProps) {
  return (
    <Button onClick={props.onClick}>
      <Column className={clsx("h-16 gap-1")} align="center" justify="center">
        <With
          className={clsx("-mt-1 rounded-full px-4 py-1 text-xl", {
            "bg-accent-soft text-accent": props.active,
          })}
        >
          {props.active ? props.iconFill : props.icon}
        </With>
        <Text style={props.active ? "tiny-accent" : "tiny"} oneLine>
          {props.name}
        </Text>
      </Column>
    </Button>
  );
}
