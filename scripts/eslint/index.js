import ensureDataSerializable from "./ensure-data-serializable.js";
import enforceImportAlias from "./enforce-import-alias.js";

const plugin = {
  meta: {
    name: "custom",
    version: "1.0.0",
  },
  rules: {
    "ensure-data-serializable": ensureDataSerializable,
    "enforce-import-alias": enforceImportAlias,
  },
};

export default plugin;
