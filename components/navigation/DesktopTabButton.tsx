import React from "react";
import { Button } from "../core/Button";
import { Row } from "../core/Row";
import { Text } from "../core/Text";
import { With } from "../core/With";
import clsx from "clsx";
import { NavTab } from "./utils";
import { usePageContext } from "vike-react/usePageContext";

export type DesktopTabButtonProps = {
  tab: NavTab;
};

export function DesktopTabButton(props: DesktopTabButtonProps) {
  const { urlPathname } = usePageContext();
  const active = props.tab.active(urlPathname);

  return (
    <Button href={props.tab.path}>
      <Row
        className={clsx(
          "h-12 gap-2 border-y-2 border-transparent px-4 group-hover:bg-slate-100 group-active:bg-slate-200",
          { "border-b-blue-800": active },
        )}
        align="center"
      >
        <With className="-ml-0.5 text-lg">{props.tab.icon}</With>
        <Text>{props.tab.name}</Text>
      </Row>
    </Button>
  );
}
