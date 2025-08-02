import { busReplacementsDisruptionDataQuestion } from "@/components/processing/disruption-data/bus-replacements-disruption-data-question";
import { delaysDisruptionDataQuestion } from "@/components/processing/disruption-data/delays-disruption-data-question";
import { noCityLoopDisruptionDataQuestion } from "@/components/processing/disruption-data/no-city-loop-disruption-data-question";
import { noTrainsRunningDisruptionDataQuestion } from "@/components/processing/disruption-data/no-trains-running-disruption-data-question";
import { stationClosureDisruptionDataQuestion } from "@/components/processing/disruption-data/station-closure-disruption-data-question";
import { q } from "@/components/question";
import { AnyField } from "@/components/question/common/field";
import { DisruptionDataInput } from "@/shared/schemas/common/disruption-data-input";

export const disruptionDataQuestion = q.discriminatedUnion(
  "type",
  "What is the category of disruption?",
  {
    "bus-replacements": busReplacementsDisruptionDataQuestion,
    "no-city-loop": noCityLoopDisruptionDataQuestion,
    "station-closure": stationClosureDisruptionDataQuestion,
    delays: delaysDisruptionDataQuestion,
    "no-trains-running": noTrainsRunningDisruptionDataQuestion,
    // TODO: Add custom disruption data question
  },
  {
    "bus-replacements": "Buses replacing trains",
    "no-city-loop": "Trains running direct instead of via the City Loop",
    "station-closure": "Station closure",
    delays: "Delays",
    "no-trains-running": "Trains not running/terminating early",
  },
) satisfies AnyField<DisruptionDataInput>;
