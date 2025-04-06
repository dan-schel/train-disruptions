import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "@/pages/line/@id/+data";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Calendar } from "@/components/calendar/Calendar";
import { ActiveDisruption } from "@/pages/line/@id/ActiveDisruption";
import { UpcomingDisruption } from "@/pages/line/@id/UpcomingDisruption";
import { MingcuteCheckCircleFill } from "@/components/icons/MingcuteCheckCircleFill";
import { Row } from "@/components/core/Row";

export default function Page() {
  const { line } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Overview" href="/overview" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            {line != null ? (
              <>
                <Text style="megatitle">Is it buses...</Text>
                <Text>
                  on the <b>{line.name}</b> line?
                </Text>

                {line.active.length > 0 ? (
                  <Column>
                    {line.active.map((x) => (
                      <ActiveDisruption
                        key={x.id}
                        lineNumber={line.id}
                        disruption={x}
                      />
                    ))}
                  </Column>
                ) : (
                  <Column className="gap-3 py-2">
                    <Row align="center" className="text-status-green gap-2">
                      <MingcuteCheckCircleFill className="size-10" />
                      <Text style="custom" className="text-xl">
                        Trains are running
                      </Text>
                    </Row>
                    <Text>There are no reported disruptions</Text>
                  </Column>
                )}

                <hr className="border-soft-border" />

                <Column className="gap-6">
                  <Text style="subtitle">Buses replace trains...</Text>

                  <Calendar data={line.calendar} />
                </Column>

                <hr className="border-soft-border" />

                <Text style="subtitle">Upcoming disruptions</Text>
                <Column className="divide-soft-border divide-y">
                  {line.upcoming.map((x) => (
                    <UpcomingDisruption
                      key={x.id}
                      lineNumber={line.id}
                      disruption={x}
                    />
                  ))}
                </Column>
              </>
            ) : (
              <Text>We don&apos;t know about this line 😔</Text>
            )}
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
