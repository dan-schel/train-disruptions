import React from "react";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";

export type DisruptionProps = {
  data: {
    title: string;
    bodyMarkdown: string;
    raw: string;
  };
};

export function InvalidDisruption(props: DisruptionProps) {
  const { title, bodyMarkdown, raw } = props.data;

  return (
    <Column className="gap-8">
      <Text style="title">{title}</Text>
      <Column className="gap-4">
        {bodyMarkdown
          .split("\n")
          .map((x) => x.trim())
          .filter((x) => x.length > 0)
          .map((x, i) => (
            <Text key={i}>{x}</Text>
          ))}
      </Column>

      <Column className="border-soft-border divide-soft-border bg-soft divide-y overflow-x-scroll rounded-md border">
        <pre className="_ptv-preview">{raw}</pre>
      </Column>

      {/* TODO: Add buttons to post process disruptions */}
    </Column>
  );
}
