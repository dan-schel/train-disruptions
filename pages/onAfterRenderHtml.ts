import { PageContext } from "vike/types";
import { useConfig } from "vike-react/useConfig";

export default (pageContext: PageContext) => {
  const { theme } = pageContext.custom.settings;
  const config = useConfig();
  config({
    htmlAttributes: {
      class:
        theme === "dark" ? "dark" : theme === "system" ? "system" : undefined,
    },
  });
};
