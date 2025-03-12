import React from "react";
import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { DisplayData } from "@/pages/trip/+data";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Spacer } from "@/components/core/Spacer";
import { useSettings } from "@/hooks/useSettings";
import { Row } from "@/components/core/Row";
import { MingcuteCheckLine } from "@/components/icons/MingcuteCheckLine";

export type DisplayTripPageProps = {
  data: DisplayData;
};

export function DisplayTripPage(props: DisplayTripPageProps) {
  const [commuteUpdated, setCommuteUpdated] = React.useState(false);
  const { updateSettings } = useSettings();

  function handleSetAsCommute() {
    updateSettings((settings) =>
      settings.with({
        commute: { a: props.data.stationA.id, b: props.data.stationB.id },
      }),
    );
    setCommuteUpdated(true);
  }

  return (
    <Column>
      <BackNavigation name="Trip" href="/trip" />
      <PageCenterer>
        <PagePadding>
          <Column>
            <Text style="title">Is it buses...</Text>
            <Spacer h="4" />
            <Text>
              between <b>{props.data.stationA.name}</b> and{" "}
              <b>{props.data.stationB.name}</b>?
            </Text>
            <Spacer h="8" />
            {!props.data.isCurrentCommute && (
              <Column
                align="left"
                className="gap-4 border border-slate-200 p-4"
              >
                <Text style="subtitle">Check this trip often?</Text>
                <Text>Have it show in the My Commute tab by default.</Text>
                {!commuteUpdated ? (
                  <SimpleButton
                    text="Set as my commute"
                    onClick={handleSetAsCommute}
                  />
                ) : (
                  <Row
                    className="h-8 gap-2 border border-slate-200 px-4"
                    align="center"
                  >
                    <MingcuteCheckLine />
                    <Text>Commute updated!</Text>
                  </Row>
                )}
              </Column>
            )}
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
