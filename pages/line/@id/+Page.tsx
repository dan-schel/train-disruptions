import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "@/pages/line/@id/+data";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Calendar } from "@/components/calendar/Calendar";

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

                  <Calendar data={line.calendar} />
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
