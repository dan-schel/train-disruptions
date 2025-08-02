import { render } from "vike/abort";
import { GuardSync, PageContext } from "vike/types";

export function guard(pageContext: PageContext): ReturnType<GuardSync> {
  const { settings } = pageContext.custom;

  // `render` preserves the url as '/' but requires extra logic in
  // `NavBarOrchestrator` to handle when the tab is active
  throw render(
    `/${settings.startPage}?${new URLSearchParams(pageContext.urlParsed.search)}`,
  );
}
