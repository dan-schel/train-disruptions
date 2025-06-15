import React from "react";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Data } from "@/pages/admin/alerts/@id/+data";
import { useData } from "vike-react/useData";
import { AlertData } from "@/pages/admin/alerts/@id/AlertData";
import { Spacer } from "@/components/core/Spacer";
import { disruptionPeriodQuestion } from "@/components/alert-processing/disruption-period/disruption-period-question";
import { DisruptionPeriodInput } from "@/shared/types/alert-processing/disruption-period-input";
import { Questionaire } from "@/components/question";

export default function Page() {
  const { alert } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Alerts" href="/admin/alerts" />
      <PageCenterer>
        <PagePadding>
          {alert != null ? (
            <Column className="min-w-0">
              <Text style="megatitle">Process alert</Text>
              <Spacer h="4" />
              <AlertData data={alert.data} />
              <Spacer h="8" />
              <hr className="border-soft-border" />
              <Spacer h="8" />
              <Text style="subtitle">Disruption builder</Text>
              <Spacer h="4" />
              <Column className="gap-6">
                <Questionaire
                  config={disruptionPeriodQuestion}
                  // eslint-disable-next-line no-console
                  onSubmit={(p: DisruptionPeriodInput) => console.log(p)}
                />
              </Column>
            </Column>
          ) : (
            <Column className="gap-4">
              <Text style="megatitle">Alert not found</Text>
              <Text>Alert not found</Text>
            </Column>
          )}
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
