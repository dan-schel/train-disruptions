import ensureDataSerializable from "./ensure-data-serializable.js";
import enforceImportAlias from "./enforce-import-alias.js";
import preventEntryPointImports from "./prevent-entry-point-imports.js";
import preventServerImportsInFrontend from "./prevent-server-imports-in-frontend.js";

const plugin = {
  meta: {
    name: "custom",
    version: "1.0.0",
  },
  rules: {
    "ensure-data-serializable": ensureDataSerializable,
    "enforce-import-alias": enforceImportAlias,
    "prevent-entry-point-imports": preventEntryPointImports,
    "prevent-server-imports-in-frontend": preventServerImportsInFrontend,
  },
};

export default plugin;
