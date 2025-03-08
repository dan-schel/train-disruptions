import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { PagePadding } from "../../../components/common/PagePadding";
import { BackNavigation } from "../../../components/navigation/BackNavigation";
import { Calendar } from "../../../components/calendar/Calendar";

export default function Page() {
  const { line } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Overview" href="/" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            {line != null ? (
              <>
                <Text style="title">Is it buses...</Text>
                <Text>
                  on the <b>{line.name}</b> line?
                </Text>

                <hr className="border-slate-200" />

                <Column className="gap-6">
                  <Text style="title">Buses replace trains...</Text>

                  <Calendar
                    disruptions={[
                      {
                        from: new Date("2025-02-07T14:00:00Z"),
                        to: new Date("2025-02-09T12:00:00Z"),
                        evenings: false,
                      },
                      {
                        from: new Date("2025-02-17T09:30:00Z"),
                        to: new Date("2025-02-18T12:59:59Z"),
                        evenings: true,
                      },
                      {
                        from: new Date("2025-02-14T14:00:00Z"),
                        to: new Date("2025-02-16T12:00:00Z"),
                        evenings: false,
                      },
                      {
                        from: new Date("2025-02-24T09:30:00Z"),
                        to: new Date("2025-02-26T12:00:00Z"),
                        evenings: true,
                      },
                      {
                        from: new Date("2025-02-06T09:30:00Z"),
                        to: new Date("2025-02-06T12:59:59Z"),
                        evenings: true,
                      },
                    ]}
                  />
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
