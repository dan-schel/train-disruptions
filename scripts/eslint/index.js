import ensureDataSerializable from "./ensure-data-serializable.js";

const plugin = {
  meta: {
    name: "custom",
    version: "1.0.0",
  },
  rules: {
    "ensure-data-serializable": ensureDataSerializable,
  },
};

export default plugin;
