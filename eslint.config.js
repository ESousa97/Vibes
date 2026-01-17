import globals from "globals";

export default [
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "no-unused-vars": ["error", { "args": "none" }],
      "no-undef": "error",
      "no-console": "off"
    }
  }
];
