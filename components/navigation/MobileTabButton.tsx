import React from "react";

import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { NavTab } from "@/components/navigation/utils";
import { usePageContext } from "vike-react/usePageContext";
import { Column } from "@/components/core/Column";

export type MobileTabButtonProps = {
  tab: NavTab;
};

export function MobileTabButton(props: MobileTabButtonProps) {
  const { urlPathname } = usePageContext();
  const active = props.tab.active(urlPathname);

  return (
    <Button href={props.tab.path}>
      <Column className={clsx("h-16 gap-1")} align="center" justify="center">
        <With
          className={clsx("-mt-1 rounded-full px-4 py-1 text-xl", {
            "bg-action text-active": active,
          })}
        >
          {active ? props.tab.iconFill : props.tab.icon}
        </With>
        <Text
          style={active ? "mobile-nav-bar-active" : "mobile-nav-bar"}
          oneLine
        >
          {props.tab.name}
        </Text>
      </Column>
    </Button>
  );
}
