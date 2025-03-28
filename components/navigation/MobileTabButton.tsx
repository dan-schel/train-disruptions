import React from "react";

import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { NavTab } from "@/components/navigation/utils";
import { Column } from "@/components/core/Column";

export type MobileTabButtonProps = {
  tab: NavTab;
  isActive: boolean;
  onClick: () => void;
};

export function MobileTabButton(props: MobileTabButtonProps) {
  return (
    <Button onClick={props.onClick}>
      <Column className={clsx("h-16 gap-1")} align="center" justify="center">
        <With
          className={clsx("-mt-1 rounded-full px-4 py-1 text-xl", {
            "bg-accent-soft text-accent": props.isActive,
            "group-hover:bg-soft-hover": !props.isActive,
          })}
        >
          {props.isActive ? props.tab.iconFill : props.tab.icon}
        </With>
        <Text style={props.isActive ? "tiny-accent" : "tiny"} oneLine>
          {props.tab.name}
        </Text>
      </Column>
    </Button>
  );
}
