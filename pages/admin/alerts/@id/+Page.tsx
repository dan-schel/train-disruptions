import React from "react";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Data } from "@/pages/admin/alerts/@id/+data";
import { useData } from "vike-react/useData";
import { AlertData } from "@/pages/admin/alerts/@id/AlertData";
import { EndsApproximatelyQuestion } from "@/components/alert-processing/disruption-period/EndsApproximatelyQuestion";

export default function Page() {
  const { alert } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Alerts" href="/admin/alerts" />
      <PageCenterer>
        <PagePadding>
          {alert != null ? (
            <Column className="min-w-0 gap-4">
              {/* TODO: [DS] Temporary! */}
              <EndsApproximatelyQuestion
                input={null}
                onSubmit={(value) => console.log(value)}
                props={null}
              />
              <Text style="megatitle">Process alert</Text>
              <AlertData data={alert.data} />
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
