import React from "react";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { listifyAnd } from "@dan-schel/js-utils";
import { Link } from "@/components/core/Link";
import { Spacer } from "@/components/core/Spacer";

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
    urlPreview: { html: string } | { error: string };
  };
};

export function AlertData({ data }: AlertDataProps) {
  return (
    <Column>
      <Column className="gap-4">
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>

        {/* TODO: [DS] Need to use custom formatter. Causes hydration issues. */}
        <Text>Starts at: {data.startsAt?.toString()}</Text>
        <Text>Ends at: {data.endsAt?.toString()}</Text>

        <Text>
          Affected lines:{" "}
          {data.affectedLines.length === 0 ? (
            <i>[None]</i>
          ) : (
            listifyAnd(data.affectedLines.map((x) => x.name))
          )}
        </Text>
        <Text>
          Affected stations:{" "}
          {data.affectedStations.length === 0 ? (
            <i>[None]</i>
          ) : (
            listifyAnd(data.affectedStations.map((x) => x.name))
          )}
        </Text>
      </Column>

      <Spacer h="8" />
      <hr className="border-soft-border" />
      <Spacer h="8" />

      <Text style="subtitle">Additional details</Text>
      <Spacer h="2" />
      <Text style="tiny-weak">{data.url}</Text>
      <Spacer h="6" />
      {/* // TODO: [DS] Obviously temporary!! */}
      {"html" in data.urlPreview && (
        <div
          dangerouslySetInnerHTML={{
            __html: data.urlPreview.html,
          }}
        />
      )}
      {"error" in data.urlPreview && (
        <>
          <Text>
            <b>Error:</b> {data.urlPreview.error}
          </Text>
          <Spacer h="4" />
          <Text>
            <Link href={data.url} target="_blank">
              Open the page in a new tab instead
            </Link>
          </Text>
        </>
      )}
    </Column>
  );
}
