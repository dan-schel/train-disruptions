import React from "react";
import { Button } from "../core/Button";
import { Text } from "../core/Text";
import { With } from "../core/With";
import clsx from "clsx";
import { NavTab } from "./utils";
import { usePageContext } from "vike-react/usePageContext";
import { Column } from "../core/Column";

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
            "bg-blue-100 text-blue-800": active,
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
