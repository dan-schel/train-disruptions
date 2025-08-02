import React from "react";

import { Collapsible } from "@/components/common/Collapsible";
import { Column } from "@/components/core/Column";
import { DisruptionType } from "@/shared/types/disruption";
import { Text } from "@/components/core/Text";
import { Switch } from "@/components/common/Switch";
import { usePageContext } from "vike-react/usePageContext";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Spacer } from "@/components/core/Spacer";

const mapDisruptionType: Record<string, DisruptionType> = {
  "Bus replacements": "bus-replacements",
  "No trains running": "no-trains-running",
  "No city loop": "no-city-loop",
  "Station closures": "station-closure",
  Delays: "delays",
  Custom: "custom",
};

type DisruptionTypeFilterProps = {
  filteredTypes: DisruptionType[];
};

export function DisruptionTypeFilter({
  filteredTypes,
}: DisruptionTypeFilterProps) {
  const { urlParsed } = usePageContext();
  const [types, setTypes] = React.useState<DisruptionType[]>(filteredTypes);

  function handleChange(checked: boolean, type: DisruptionType) {
    setTypes((prev) =>
      checked ? [...prev, type] : prev.filter((x) => x !== type),
    );
  }

  // Filtering needs to be batched as changing the search params reloads the page
  function handleFilter() {
    const params = new URLSearchParams(urlParsed.search);
    params.delete("type");

    types.forEach((type) => {
      params.append("type", type);
    });

    window.location.search = params.toString();
  }

  return (
    <Collapsible
      label={`Disruption Type (${filteredTypes.length}/${Object.keys(mapDisruptionType).length} applied)`}
    >
      <Column className="bg-soft/30 p-2">
        {Object.entries(mapDisruptionType).map(([label, type]) => (
          <Switch
            key={type}
            checked={types.includes(type)}
            onChange={(checked) => handleChange(checked, type)}
            className="p-2"
          >
            <Text style="small">{label}</Text>
          </Switch>
        ))}

        <Spacer h="2" />

        <SimpleButton
          text="Filter types"
          layout="tile"
          theme="primary"
          onClick={handleFilter}
        />
      </Column>
    </Collapsible>
  );
}
