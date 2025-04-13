import React from "react";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { listifyAnd } from "@dan-schel/js-utils";
import { Link } from "@/components/core/Link";

export type AlertDataProps = {
  data: {
    title: string;
    description: string;
    url: string;
    startsAt: Date | null;
    endsAt: Date | null;
    affectedLines: {
      name: string;
    }[];
    affectedStations: {
      name: string;
    }[];
    ptvHtml: string | null;
  };
};

export function AlertData({ data }: AlertDataProps) {
  return (
    <Column className="gap-4">
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
      <Text>Starts at: {data.startsAt?.toString()}</Text>
      <Text>Ends at: {data.endsAt?.toString()}</Text>
      <Text>
        Affected lines: {listifyAnd(data.affectedLines.map((x) => x.name))}
      </Text>
      <Text>
        Affected stations:{" "}
        {listifyAnd(data.affectedStations.map((x) => x.name))}
      </Text>
      <Text>
        Additional details (or{" "}
        <Link href={data.url}>view on ptv.vic.gov.au</Link>)
      </Text>

      {/* // TODO: [DS] Obviously temporary!! */}
      <div
        dangerouslySetInnerHTML={{
          __html: data.ptvHtml ?? "<p>Preview unavailable</p>",
        }}
        className="border-soft-border border p-4"
      />
    </Column>
  );
}
