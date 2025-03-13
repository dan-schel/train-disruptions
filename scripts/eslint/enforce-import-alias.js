import path from "path";

const exceptions = [
  // ESLint config doesn't use import aliases.
  "/scripts/eslint/",
  "/eslint.config.js",
];

const useImportAlias = {
  meta: {
    type: "problem",
    messages: {
      violation: "Replace relative import with {{ replacement }}.",
    },
    schema: [],
    fixable: "code",
  },
  create: (context) => {
    return {
      ImportDeclaration: (node) => {
        const repoRelativeFileName = context.filename.replace(context.cwd, "");
        if (exceptions.some((e) => repoRelativeFileName.startsWith(e))) return;

        const value = node.source.value;
        if (!value.startsWith(".")) return;

        const absolutePath = path.resolve(
          path.dirname(context.filename),
          value,
        );

        const aliasedPath = absolutePath
          .replace(context.cwd, "@")
          .replace(/\\/g, "/");

        const replacement = `"${aliasedPath}"`;

        context.report({
          loc: node.source.loc,
          messageId: "violation",
          data: {
            replacement,
          },
          fix: (fixer) => {
            return fixer.replaceText(node.source, replacement);
          },
        });
      },
    };
  },
  defaultOptions: [],
};

export default useImportAlias;
