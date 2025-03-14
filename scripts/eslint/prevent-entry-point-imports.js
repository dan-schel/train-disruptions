import { unixify } from "./utils";

export default {
  meta: {
    type: "problem",
    messages: {
      violation:
        'Do not import from "@/server/entry-point". You should access this using App instead.',
    },
    schema: [],
  },
  create: (context) => {
    return {
      ImportDeclaration: (node) => {
        const repoRelativeFileName = unixify(
          context.filename.replace(context.cwd, ""),
        );

        if (repoRelativeFileName.startsWith("/server/entry-point/")) return;
        if (!repoRelativeFileName.startsWith("/server/")) return;

        const value = node.source.value;
        if (!value.startsWith("@/server/entry-point/")) return;

        context.report({
          loc: node.source.loc,
          messageId: "violation",
        });
      },
    };
  },
  defaultOptions: [],
};
