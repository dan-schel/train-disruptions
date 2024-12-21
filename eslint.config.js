import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

const customRules = {
  rules: {
    // Ignore unused variables if they start with underscores.
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // Require === and !==, except when comparing to null.
    eqeqeq: ["error", "always", { null: "ignore" }],

    // Warn on console.log uses, but allow console.warn.
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // TODO: Remove this? What does it do?
    "@typescript-eslint/no-namespace": 0,

    // Warn about prettier violations.
    "prettier/prettier": "warn",
  },
};

const reactConfig = {
  files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
  ...react,
  languageOptions: {
    ...react.languageOptions,
    globals: {
      ...globals.serviceworker,
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

export default tseslint.config(
  {
    ignores: ["node_modules/*", "dist/*", "coverage/*"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactConfig,
  prettier,
  customRules,
);
