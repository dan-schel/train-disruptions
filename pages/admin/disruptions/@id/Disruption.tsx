import React from "react";

import { Map } from "@/components/map/Map";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import { Column } from "@/components/core/Column";
import { Calendar } from "@/components/calendar/Calendar";
import { CalendarData } from "@/shared/types/calendar-data";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { AlertPreview } from "@/shared/types/alert-data";
import { AlertListContainer } from "@/components/alerts/AlertListContainer";
import { usePageContext } from "vike-react/usePageContext";
import { Actions } from "@/pages/admin/disruptions/@id/Actions";

export type DisruptionProps = {
  data: {
    title: string;
    bodyMarkdown: string;
    calendar: CalendarData | null;
    highlighting?: SerializedMapHighlighting;
    raw?: string;
    alerts: AlertPreview;
  };
};

export function Disruption(props: DisruptionProps) {
  const {
    routeParams: { id },
  } = usePageContext();
  const { title, bodyMarkdown, calendar, highlighting, raw, alerts } =
    props.data;

  return (
    <Column className="gap-8">
      <Text style="title">{title}</Text>
      <Column className="gap-4">
        {bodyMarkdown
          .split("\n")
          .map((x) => x.trim())
          .filter((x) => x.length > 0)
          .map((x, i) => (
            <Text key={i}>{x}</Text>
          ))}
      </Column>

      <Actions id={id} />

      {Boolean(raw) && (
        <Column className="border-soft-border divide-soft-border bg-soft divide-y rounded-md border">
          <pre className="_ptv-preview">{raw}</pre>
        </Column>
      )}

      {calendar && <Calendar data={calendar} />}

      {highlighting && (
        <With className="border-soft-border rounded-md border">
          <Map highlighting={highlighting} mode="show-disruptions" />
        </With>
      )}

      <Column className="gap-4">
        <Text>Related Alerts</Text>

        <AlertListContainer alerts={alerts} from={id} />
      </Column>
    </Column>
  );
}
