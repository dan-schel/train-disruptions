import React from "react";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { SimpleButton } from "@/components/common/SimpleButton";
import { PagePadding } from "@/components/common/PagePadding";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/commute/+data";
import { Spacer } from "@/components/core/Spacer";

export default function Page() {
  const { commute } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column align="left">
          {commute != null && (
            <>
              <Text style="megatitle">Is it buses...</Text>
              <Spacer h="4" />
              <Text>
                between <b>{commute.stationAName}</b> and{" "}
                <b>{commute.stationBName}</b>?
              </Text>
            </>
          )}
          {commute == null && (
            <>
              <Text style="megatitle">My commute</Text>
              <Spacer h="4" />
              <Text>
                Tell us the two stations you&apos;re travelling between, and
                we&apos;ll only show the disruptions relevant to you.
              </Text>
              <Spacer h="8" />
              <Text>[Form to enter two stations goes here!]</Text>
            </>
          )}
          <Spacer h="8" />
          <SimpleButton href="/trip" text="Click here to go to Trips" />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
