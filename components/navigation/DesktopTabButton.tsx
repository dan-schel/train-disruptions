import React from "react";

import { Button } from "@/components/core/Button";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";

export type DesktopTabButtonProps = {
  name: string;
  icon: React.ReactElement;
  isActive: boolean;
  onClick: () => void;
};

export function DesktopTabButton(props: DesktopTabButtonProps) {
  return (
    <Button onClick={props.onClick}>
      <Row
        className={clsx("h-12 gap-2 border-y-2 border-transparent", {
          "border-b-accent": props.isActive,
          "group-hover:border-b-switch group-active:border-b-switch-hover":
            !props.isActive,
        })}
        align="center"
      >
        <With className="-ml-0.5 text-lg">{props.icon}</With>
        <Text>{props.name}</Text>
      </Row>
    </Button>
  );
}
