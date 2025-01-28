import React from "react";
import { useData } from "vike-react/useData";

import { Data } from "./+data";

import { Text } from "../../../components/core/Text";
import { Column } from "../../../components/core/Column";
import { PageCenterer } from "../../../components/common/PageCenterer";
import { PagePadding } from "../../../components/common/PagePadding";

/**
 * TODO: Handle scenarios where the provided id doesn't correspond to a line.
 *
 * Options:
 * - Show an error page
 * - Navigate back straight away
 */

export default function Page() {
  const { line } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          {line ? (
            <Text>Is it buses on the {line.name} line</Text>
          ) : (
            <Text>We don&apos;t know about this line 😔</Text>
          )}
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
