import { ESLintUtils } from "@typescript-eslint/utils";

export default ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    messages: {
      violation:
        "Always append `& JsonSerializable` to the return type of +data functions, e.g. `Data & JsonSerializable`.",
      violationPromise:
        "Always append `& JsonSerializable` to the return type of +data functions, e.g. `Promise<Data & JsonSerializable>`.",
    },
    schema: [],
    fixable: "code",
  },
  create: (context) => {
    if (!context.filename.endsWith("+data.ts")) {
      return {};
    }

    return {
      FunctionDeclaration: (node) => {
        if (node.id.name !== "data") {
          return;
        }

        const returnType = node.returnType.typeAnnotation;
        const valid =
          isIntersectionWithJsonSerializable(returnType) ||
          isPromiseWithJsonSerializable(returnType);

        if (!valid) {
          if (isPromise(returnType)) {
            const promiseParam = returnType.typeArguments.params[0];

            context.report({
              loc: promiseParam.loc,
              messageId: "violationPromise",
              fix: (fixer) => {
                return fixer.insertTextAfter(
                  promiseParam,
                  " & JsonSerializable",
                );
              },
            });
          } else {
            context.report({
              loc: returnType.loc,
              messageId: "violation",
              fix(fixer) {
                return fixer.insertTextAfter(returnType, " & JsonSerializable");
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});

function isIntersectionWithJsonSerializable(returnType) {
  return (
    returnType.type === "TSIntersectionType" &&
    returnType.types.some(
      (x) =>
        x.type === "TSTypeReference" && x.typeName.name === "JsonSerializable",
    )
  );
}

function isPromise(returnType) {
  return (
    returnType.type === "TSTypeReference" &&
    returnType.typeName.name === "Promise" &&
    returnType.typeArguments &&
    returnType.typeArguments.params.length === 1
  );
}

function isPromiseWithJsonSerializable(returnType) {
  return (
    isPromise(returnType) &&
    isIntersectionWithJsonSerializable(returnType.typeArguments.params[0])
  );
}
