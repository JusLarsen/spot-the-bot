import js from "@eslint/js";
import globals from "globals";
import html from "eslint-plugin-html";

// The whole game lives in index.html. eslint-plugin-html extracts the inline
// <script type="module"> so ESLint can lint the embedded ES-module JS.
const shared = {
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: { ...globals.browser },
  },
  rules: {
    ...js.configs.recommended.rules,
    // Empty catch blocks are used intentionally for best-effort Firebase writes.
    "no-empty": ["error", { allowEmptyCatch: true }],
    "no-unused-vars": "warn",
  },
};

export default [
  // index.html: lint the inline <script> via eslint-plugin-html
  { files: ["**/*.html"], plugins: { html }, ...shared },
  // questions.js: the question bank module
  { files: ["questions.js"], ...shared },
];
