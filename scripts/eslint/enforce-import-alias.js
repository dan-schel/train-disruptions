import path from "path";

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
        const value = node.source.value;
        if (!value.startsWith(".")) return;

        const absolutePath = path.resolve(
          path.dirname(context.filename),
          value,
        );
        const aliasedPath = absolutePath.replace(context.cwd, "@");
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
