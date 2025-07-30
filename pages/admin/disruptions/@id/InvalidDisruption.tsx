import React from "react";

import { Column } from "@/components/core/Column";
import { AlertPreview } from "@/shared/types/alert-data";
import { Text } from "@/components/core/Text";
import { CalendarData } from "@/shared/types/calendar-data";
import { AlertListContainer } from "@/components/alerts/AlertListContainer";
import { Calendar } from "@/components/calendar/Calendar";
import { usePageContext } from "vike-react/usePageContext";
import { Actions } from "@/pages/admin/disruptions/@id/Actions";

type InvalidDisruptionProps = {
  data: {
    title: string;
    bodyMarkdown: string;
    calendar: CalendarData | null;
    raw: string;
    alerts: AlertPreview;
  };
};

export function InvalidDisruption(props: InvalidDisruptionProps) {
  const {
    routeParams: { id },
  } = usePageContext();
  const { title, bodyMarkdown, calendar, raw, alerts } = props.data;

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

      <Column className="border-soft-border divide-soft-border bg-soft divide-y rounded-md border">
        <pre className="_ptv-preview">{raw}</pre>
      </Column>

      <Actions id={id} />

      {calendar && <Calendar data={calendar} />}

      <Column className="gap-4">
        <Text>Related Alerts</Text>
        <AlertListContainer alerts={alerts} from={id} />
      </Column>
    </Column>
  );
}
