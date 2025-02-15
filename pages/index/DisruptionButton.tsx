import React from "react";
import { Button } from "../../components/core/Button";
import { Column } from "../../components/core/Column";
import { Grid } from "../../components/core/Grid";
import { Text } from "../../components/core/Text";
import { MingcuteRightLine } from "../../components/icons/MingcuteRightLine";
import { MingcuteCloseCircleFill } from "../../components/icons/MingcuteCloseCircleFill";

type DisruptionType =
  | {
      type: "buses";
      title: string;
      duration: string;
      colour: string;
    }
  | {
      type: "major delays" | "minor delays";
      lineName: string;
      colour: string;
    }
  | {
      type: "station closure";
      Station: string;
      duration: string;
    };

type DisruptionButtonProps = {
  id: number;
} & DisruptionType;

export function DisruptionButton(props: DisruptionButtonProps) {
  const { id, type } = props;

  const renderIcon = () => {
    if (type === "station closure") {
      return <MingcuteCloseCircleFill className="size-8" />;
    }

    return (
      <div
        className="grid size-8 rounded-full"
        style={{ backgroundColor: props.colour }}
      />
    );
  };

  const renderDescription = () => {
    switch (type) {
      case "buses":
        return (
          <>
            <Text style="custom" className="text-xs">
              Buses replace trains
            </Text>
            <Text>{props.title}</Text>
            <Text style="custom" className="text-xs">
              {props.duration}
            </Text>
          </>
        );
      case "major delays":
      case "minor delays":
        return (
          <>
            <Text style="custom" className="text-xs capitalize">
              {type}
            </Text>
            <Text>{props.lineName} line</Text>
          </>
        );
      case "station closure":
        return (
          <>
            <Text>{props.Station} station closed</Text>
            <Text style="custom" className="text-xs">
              {props.duration}
            </Text>
          </>
        );
    }
  };

  return (
    <Button href={`/disruption/${id}`}>
      <Grid
        columns="2rem 1fr 1.5rem"
        align="center"
        className="gap-2 p-2 transition-colors group-active:bg-slate-200"
      >
        {renderIcon()}
        <Column className="gap-1.5">{renderDescription()}</Column>
        <MingcuteRightLine className="size-full" />
      </Grid>
    </Button>
  );
}
