import { unixify } from "./utils";

export default {
  meta: {
    type: "problem",
    messages: {
      violation:
        'Do not import from "@/server" in frontend code. You should access this using a +data hook or an API call instead.',
    },
    schema: [],
  },
  create: (context) => {
    return {
      ImportDeclaration: (node) => {
        const repoRelativeFileName = unixify(
          context.filename.replace(context.cwd, ""),
        );

        if (repoRelativeFileName.endsWith("/+data.ts")) return;
        if (repoRelativeFileName.startsWith("/server/")) return;
        if (repoRelativeFileName.startsWith("/tests/")) return;
        if (repoRelativeFileName === "/main.ts") return;

        const value = node.source.value;
        if (!value.startsWith("@/server/")) return;

        context.report({
          loc: node.source.loc,
          messageId: "violation",
        });
      },
    };
  },
  defaultOptions: [],
};
