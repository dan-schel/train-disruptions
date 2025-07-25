import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/disruption/+data";
import { initState, reducer } from "@/pages/admin/disruption/filters/reducer";

import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { Button } from "@/components/core/Button";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { SimpleButton } from "@/components/common/SimpleButton";
import { MingcuteUpLine } from "@/components/icons/MingcuteUpLine";
import { MingcuteDownLine } from "@/components/icons/MingcuteDownLine";
import { LineFilter } from "@/pages/admin/disruption/filters/LineFilter";
import { TypeFilter } from "@/pages/admin/disruption/filters/TypeFilter";
import { PeriodFilter } from "@/pages/admin/disruption/filters/PeriodFilter";
import { ValidityFilter } from "@/pages/admin/disruption/filters/ValidityFilter";

export function DisruptionFilter() {
  const { lines, filters } = useData<Data>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [state, dispatch] = React.useReducer(
    reducer,
    filters,
    initState(lines.map(({ id }) => id)),
  );

  const suburbanLines = lines
    .filter(({ lineGroup }) => lineGroup === "suburban")
    .map(({ id }) => id);
  const regionalLines = lines
    .filter(({ lineGroup }) => lineGroup === "regional")
    .map(({ id }) => id);
  const suburban = React.useMemo(
    () => state.lines.filter((id) => suburbanLines.includes(id)),
    [state.lines, suburbanLines],
  );
  const regional = React.useMemo(
    () => state.lines.filter((id) => regionalLines.includes(id)),
    [state.lines, regionalLines],
  );

  const handleLineSelected = (
    group: "suburban" | "regional",
    checked: boolean,
    line?: number,
  ) => {
    const a = group === "suburban" ? suburbanLines : regionalLines;
    const b = group === "suburban" ? regional : suburban;

    let newLines = state.lines;

    if (line !== undefined) {
      newLines = checked
        ? [...newLines, line]
        : newLines.filter((x) => x !== line);
    } else {
      newLines = checked ? [...a, ...b] : b;
    }

    dispatch({ field: "lines", payload: newLines });
  };

  const handleSubmit = () => {
    const search = new URLSearchParams();
    const { types, start, end } = state;

    types.forEach((x) => {
      search.append("types", x);
    });
    if (start || end) {
      if (start && end) {
        if (end >= start) {
          search.append("start", start.toISOString());
          search.append("end", end.toISOString());
        }
      } else {
        search.append(
          start ? "start" : "end",
          (start ?? end)?.toISOString() ?? "",
        );
      }
    }
    state.lines.forEach((x) => {
      search.append("lines", x.toString());
    });
    search.set("valid", state.validity);

    window.location.search = search.toString();
  };

  return (
    <Column className="w-full flex-none overflow-hidden">
      <PageCenterer>
        <Column>
          <Button onClick={() => setOpen((prev) => !prev)}>
            <Row
              justify="space-between"
              className="bg-soft hover:bg-soft-hover active:bg-soft-active p-2 px-4"
            >
              <Text align="center">Filters</Text>
              {open ? <MingcuteUpLine /> : <MingcuteDownLine />}
            </Row>
          </Button>
          {open && (
            <>
              <Column className="bg-soft max-h-75 gap-4 overflow-auto p-4">
                <TypeFilter
                  types={state.types}
                  onChange={(payload) => dispatch({ field: "types", payload })}
                />
                <PeriodFilter
                  start={state.start}
                  end={state.end}
                  onChange={(field, payload) => dispatch({ field, payload })}
                />
                <LineFilter
                  lines={lines}
                  selected={state.lines}
                  setSelected={handleLineSelected}
                  suburban={suburban.length === suburbanLines.length}
                  regional={regional.length === regionalLines.length}
                />
                <ValidityFilter
                  checked={state.validity}
                  setChecked={(payload) =>
                    dispatch({ field: "validity", payload })
                  }
                />
              </Column>
              <SimpleButton
                layout="tile"
                text="Filter results"
                theme="primary"
                onClick={handleSubmit}
              />
            </>
          )}
        </Column>
      </PageCenterer>
    </Column>
  );
}
