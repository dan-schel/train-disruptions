import { RouteGraph } from "../../route-graph/route-graph";

/** Knows how to modify the route graph on behalf of a certain disruption. */
export abstract class RouteGraphModifier {
  // TODO: Maybe in future we need to define a certain order for the graph to be
  // modified in, e.g. apply custom modifications first?

  abstract apply(graph: RouteGraph): RouteGraph;
}
