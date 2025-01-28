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

  return (
    <Button href={props.tab.path}>
      <Column
        className={clsx(
          "gap-2 py-2 group-hover:bg-slate-100 group-active:bg-slate-200",
        )}
        align="center"
        justify="center"
      >
        <With className="-ml-0.5 text-xl">{props.tab.icon}</With>
        <Text style="small" oneLine>
          {props.tab.name}
        </Text>
      </Column>
    </Button>
  );
}
