import React from "react";
import { Button } from "../core/Button";
import { Row } from "../core/Row";
import { Text } from "../core/Text";
import { With } from "../core/With";
import clsx from "clsx";
import { NavTab } from "./utils";
import { usePageContext } from "vike-react/usePageContext";

export type MobileTabButtonProps = {
  tab: NavTab;
};

export function MobileTabButton(props: MobileTabButtonProps) {
  const { urlPathname } = usePageContext();

  return (
    <Button href={props.tab.path}>
      <Row
        className={clsx(
          "h-8 gap-2 bg-slate-200 px-4 group-hover:bg-slate-300 group-active:bg-slate-400",
        )}
        align="center"
      >
        <With className="-ml-0.5 text-lg">{props.tab.icon}</With>
        <Text>{props.tab.name}</Text>
      </Row>
    </Button>
  );
}
