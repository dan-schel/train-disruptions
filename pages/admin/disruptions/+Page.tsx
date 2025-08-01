import React from "react";

import { Column } from "@/components/core/Column";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { Text } from "@/components/core/Text";
import { DisruptionButton } from "@/components/disruptions/DisruptionButton";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/disruptions/+data";
import { DisruptionTypeFilter } from "@/components/disruptions/filters/DisruptionType";

export default function Page() {
  const { disruptions, filters } = useData<Data>();
  return (
    <Column>
      <BackNavigation name="Admin" href="/admin" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            <Text style="megatitle">Disruptions</Text>

            <Column>
              <DisruptionTypeFilter filteredTypes={filters.type} />
            </Column>
            {/* TODO: Add more filter options */}

            <Column className="divide-soft-border divide-y-1">
              {disruptions.map((x) => (
                <DisruptionButton key={x.id} admin data={x} />
              ))}
            </Column>
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
