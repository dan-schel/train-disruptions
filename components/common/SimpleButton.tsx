import React from "react";
import { Action, Button, extractAction } from "@/components/core/Button";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { Column } from "@/components/core/Column";

const themes = {
  default:
    "bg-button-bg group-hover:bg-button-bg-hover group-active:bg-button-bg-active",
  primary:
    "bg-blue-600 group-hover:bg-blue-700 group-active:bg-blue-900 text-white",
  hover: "group-hover:bg-button-bg-hover group-active:bg-button-bg-active",
  danger: "bg-red-500 group-hover:bg-red-400 group-active:bg-red-600",
};

type Content =
  | { text: string; icon?: React.ReactElement; alt?: string }
  | { text?: undefined; icon: React.ReactElement; alt: string };

export type SimpleButtonProps = {
  theme?: keyof typeof themes;
  layout?: "default" | "tile";
} & Content &
  Action;

export function SimpleButton(props: SimpleButtonProps) {
  const action = extractAction(props);
  const theme = themes[props.theme ?? "default"];
  const layout = props.layout ?? "default";

  if (layout === "tile") {
    return (
      <Button {...action} alt={props.alt}>
        <Column
          className={clsx("gap-2 px-4 py-2", theme)}
          align="center"
          justify="center"
        >
          {props.icon && <With className="-ml-0.5 text-2xl">{props.icon}</With>}
          {props.text && <Text align="center">{props.text}</Text>}
        </Column>
      </Button>
    );
  } else {
    const iconOnly = props.text == null;

    if (iconOnly) {
      return (
        <Button {...action} alt={props.alt}>
          <Row
            className={clsx("h-8 w-8 gap-2 text-lg", theme)}
            align="center"
            justify="center"
          >
            {props.icon}
          </Row>
        </Button>
      );
    } else {
      return (
        <Button {...action} alt={props.alt}>
          <Row className={clsx("h-8 gap-2 px-4", theme)} align="center">
            {props.icon != null && (
              <With className="-ml-0.5 text-lg">{props.icon}</With>
            )}
            <Text>{props.text}</Text>
          </Row>
        </Button>
      );
    }
  }
}
