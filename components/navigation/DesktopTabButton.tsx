import React from "react";

import { Button } from "@/components/core/Button";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { NavTab } from "@/components/navigation/utils";
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
          "group-hover:bg-soft-hover group-active:bg-soft-active h-12 gap-2 border-y-2 border-transparent px-4",
          { "border-b-accent": active },
        )}
        align="center"
      >
        <With className="-ml-0.5 text-lg">{props.tab.icon}</With>
        <Text>{props.tab.name}</Text>
      </Row>
    </Button>
  );
}
