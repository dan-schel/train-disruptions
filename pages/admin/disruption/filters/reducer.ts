import { FilterInput } from "@/pages/admin/disruption/+data";
import { DisruptionType } from "@/shared/types/disruption";

export type FilterState = {
  types: DisruptionType[];
  start: Date | null;
  end: Date | null;
  lines: number[];
  validity: "all" | "valid" | "invalid";
};

type FilterAction =
  | {
      field: "validity";
      payload: FilterState["validity"];
    }
  | {
      field: "start" | "end";
      payload: Date | null;
    }
  | {
      field: "types";
      payload: DisruptionType;
    }
  | {
      field: "lines";
      payload: number[];
    };

export function initState(lines: number[]) {
  return function (filters: FilterInput): FilterState {
    return {
      types: filters.types ?? [
        "bus-replacements",
        "no-city-loop",
        "station-closure",
        "delays",
        "custom",
      ],
      lines: filters.lines ?? lines,
      validity: filters.valid ?? "all",
      start: filters.start ?? null,
      end: filters.end ?? null,
    };
  };
}

export function reducer(
  state: FilterState,
  { field, payload }: FilterAction,
): FilterState {
  switch (field) {
    case "validity":
      return { ...state, validity: payload };

    case "start":
    case "end":
      return {
        ...state,
        [field]: payload,
      };

    case "types":
      return {
        ...state,
        types: state.types.includes(payload)
          ? state.types.filter((x) => x !== payload)
          : [...state.types, payload],
      };

    case "lines":
      return {
        ...state,
        lines: payload,
      };

    default:
      return state;
  }
}
