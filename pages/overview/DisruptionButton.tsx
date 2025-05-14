import React from "react";
import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { Button } from "@/components/core/Button";
import { Column } from "@/components/core/Column";
import { MingcuteRightLine } from "@/components/icons/MingcuteRightLine";
import { MingcuteRouteFill } from "@/components/icons/MingcuteRouteFill";
import { MingcuteCloseCircleFill } from "@/components/icons/MingcuteCloseCircleFill";
import { OverviewPageDisruptionSummary } from "@/shared/types/overview-page";
import { PTVSignalMediumSpeedWarning } from "@/components/icons/PTVSignalMediumSpeedWarning";

export type DisruptionButtonProps = {
  data: OverviewPageDisruptionSummary;
};

export function DisruptionButton(props: DisruptionButtonProps) {
  const { id, headline, subject, period, icon } = props.data;

  return (
    <Button href={`/disruption/${id}`}>
      <Grid
        columns="2rem 1fr 1.5rem"
        align="center"
        className="group-active:bg-soft-active group-hover:bg-soft-hover gap-2 p-2"
      >
        <DisruptionIcon icon={icon} />
        <Column className="gap-2">
          {headline != null && <Text style="tiny-weak">{headline}</Text>}
          <Text>{subject}</Text>
          {period != null && <Text style="tiny-weak">{period}</Text>}
        </Column>
        <MingcuteRightLine className="size-full" />
      </Grid>
    </Button>
  );
}

function DisruptionIcon({
  icon,
}: {
  icon: OverviewPageDisruptionSummary["icon"];
}) {
  if (icon === "line") {
    return (
      <div className="bg-soft flex size-8 items-center justify-center overflow-hidden rounded-full">
        <div className="bg-accent grid h-full w-2 rotate-45" />
      </div>
    );
  } else if (icon === "cross") {
    return <MingcuteCloseCircleFill className="size-8" />;
  } else if (icon === "altered-route") {
    return (
      <div className="bg-soft flex size-8 items-center justify-center rounded-full">
        <MingcuteRouteFill className="text-accent size-full p-1" />
      </div>
    );
  } else if (icon === "traffic") {
    return (
      <div className="bg-soft flex size-8 items-center justify-center rounded-full">
        <PTVSignalMediumSpeedWarning className="size-full" />
      </div>
    );
  } else {
    // An empty circle. (TODO: Maybe we can define some default icon, idk.)
    return (
      <div className="bg-soft flex size-8 items-center justify-center overflow-hidden rounded-full" />
    );
  }
}
