import { PageContext } from "vike/types";

import { render } from "vike/abort";

export function guard(pageContext: PageContext) {
  const { user } = pageContext.custom;
  if (!user) throw render("/login");
}
