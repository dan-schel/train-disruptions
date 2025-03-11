import React from "react";
import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { Button } from "@/components/core/Button";
import { Column } from "@/components/core/Column";
import { MingcuteRightLine } from "@/components/icons/MingcuteRightLine";
import { MingcuteRouteFill } from "@/components/icons/MingcuteRouteFill";
import { MingcuteCloseCircleFill } from "@/components/icons/MingcuteCloseCircleFill";

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
      station: string;
      duration: string;
    }
  | {
      type: "altered-route";
      alteration: string;
      lineName: string;
      color: string;
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

    if (type === "altered-route") {
      return (
        <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
          <MingcuteRouteFill
            className="size-full p-1"
            style={{ color: props.color }}
          />
        </div>
      );
    }

    return (
      <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
        <div
          className="grid h-full w-2 rotate-45"
          style={{ backgroundColor: props.colour }}
        />
      </div>
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
            <Text>{props.station} station closed</Text>
            <Text style="custom" className="text-xs">
              {props.duration}
            </Text>
          </>
        );
      case "altered-route":
        return (
          <>
            <Text style="custom" className="text-xs">
              {props.alteration}
            </Text>
            <Text>{props.lineName} line</Text>
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
