import React from "react";
import { Data } from "@/pages/admin/alerts/+data";
import { useData } from "vike-react/useData";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { PageCenterer } from "@/components/common/PageCenterer";
import { Row } from "@/components/core/Row";
import { PagePadding } from "@/components/common/PagePadding";
import { Spacer } from "@/components/core/Spacer";

export default function Page() {
  const { unprocessedAlertCount } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Admin" href="/admin" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            <Row align="center" justify="space-between">
              <Text style="title">Alerts</Text>
            </Row>
            <Row align="center">
              <Text>
                {unprocessedAlertCount}{" "}
                {unprocessedAlertCount === 1
                  ? "unprocessed alert from PTV"
                  : "unprocessed alerts from PTV"}
              </Text>
            </Row>
            <Spacer h="6" />
            {/* Data Table? */}
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
