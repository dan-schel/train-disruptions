import React, { useState } from "react";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { Column } from "@/components/core/Column";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { SimpleButton } from "@/components/common/SimpleButton";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/disruption/+data";
import { usePageContext } from "vike-react/usePageContext";
import { Select } from "@/components/common/Select";
import { DisruptionButton } from "@/components/common/DisruptionButton";
import { DateInput } from "@/components/common/DateInput";
import { parseIntNull } from "@dan-schel/js-utils";

export default function Page() {
  const { disruptions, lines } = useData<Data>();
  const { urlParsed } = usePageContext();
  const { occurs, at, start, end } = urlParsed.search;

  const [valid, setValid] = React.useState<boolean>(
    JSON.parse(urlParsed.search.valid ?? true),
  );
  const [line, setLine] = React.useState<number | null>(
    parseIntNull(urlParsed.search.lines),
  );
  const [period, setPeriod] = React.useState<"any" | "at" | "during">(
    occurs === "at" || occurs === "during" ? occurs : "any",
  );
  const [occursAt, setAt] = React.useState<Date | null>(
    isNaN(Date.parse(at)) ? null : new Date(at),
  );
  const [startsAt, setStart] = useState<Date | null>(
    isNaN(Date.parse(start)) ? null : new Date(start),
  );
  const [endsAt, setEnd] = useState<Date | null>(
    isNaN(Date.parse(end)) ? null : new Date(end),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const search = new URLSearchParams();
    search.append("valid", JSON.stringify(valid));

    if (line) {
      search.append("line", line.toString());
    }

    if (period === "at" && occursAt) {
      search.append("occurs", period);
      search.append("at", occursAt.toISOString());
    } else if (period === "during" && (startsAt || endsAt)) {
      if (startsAt && endsAt) {
        if (endsAt >= startsAt) {
          search.append("occurs", period);
          search.append("start", startsAt.toISOString());
          search.append("end", endsAt.toISOString());
        }
      } else {
        search.append("occurs", period);
        search.append(
          startsAt ? "start" : "end",
          (startsAt ?? endsAt)?.toISOString() ?? "",
        );
      }
    }

    window.location.search = search.toString();
  }

  return (
    <Column>
      <BackNavigation name="Admin" href="/admin" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-4">
            <Text style="megatitle">Disruptions</Text>
            <form onSubmit={handleSubmit}>
              <Column className="gap-2" align="left" wrap>
                <Row align="center" className="gap-1.5" wrap>
                  <Text>Show</Text>
                  <Select
                    value={JSON.stringify(valid)}
                    handleChange={(e) =>
                      setValid(JSON.parse(e.currentTarget.value))
                    }
                    options={[
                      { label: "valid disruptions", value: "true" },
                      { label: "invalid disruptions", value: "false" },
                    ]}
                  />
                </Row>

                <Row align="center" className="gap-1.5" wrap>
                  <Text>Imapacting</Text>
                  <Select
                    value={line?.toString() ?? undefined}
                    handleChange={(e) =>
                      setLine(parseInt(e.currentTarget.value))
                    }
                    options={[{ label: "any line", value: "" }, ...lines]}
                  />
                </Row>

                <Row align="center" className="gap-1.5" wrap>
                  <Text>Occuring</Text>
                  <Select
                    value={period}
                    handleChange={(val) =>
                      setPeriod(val.target.value as typeof period)
                    }
                    options={[
                      { label: "any time", value: "any" },
                      {
                        label: "at",
                        value: "at",
                      },
                      {
                        label: "during",
                        value: "during",
                      },
                    ]}
                    name="occurs"
                  />
                </Row>

                {period === "at" && (
                  <Row>
                    <DateInput value={occursAt} onChange={setAt} />
                  </Row>
                )}

                {period === "during" && (
                  <>
                    <Row align="center" className="gap-1.5">
                      <Text>From</Text>
                      <DateInput value={startsAt} onChange={setStart} />
                    </Row>
                    <Row align="center" className="gap-1.5">
                      <Text>To</Text>
                      <DateInput value={endsAt} onChange={setEnd} />
                    </Row>
                  </>
                )}

                <SimpleButton theme="primary" submit text="Search" />
              </Column>
            </form>

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
