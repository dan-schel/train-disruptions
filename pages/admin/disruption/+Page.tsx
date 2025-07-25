import React from "react";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/disruption/+data";
import { DisruptionButton } from "@/components/common/DisruptionButton";
import { DisruptionFilter } from "@/pages/admin/disruption/filters/DisruptionFilter";

export default function Page() {
  const { disruptions } = useData<Data>();
  return (
    <>
      <Column>
        <BackNavigation name="Admin" href="/admin" />
        <PageCenterer>
          <PagePadding>
            <Column className="gap-4">
              <Text style="megatitle">Disruptions</Text>
              <DisruptionFilter />

              <Column className="divide-soft-border divide-y-1">
                {disruptions.map((x) => (
                  <DisruptionButton key={x.id} admin data={x} />
                ))}
              </Column>
            </Column>
          </PagePadding>
        </PageCenterer>
      </Column>
    </>
  );
}
