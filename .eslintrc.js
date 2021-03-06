module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier", "plugin:@typescript-eslint/recommended"],
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": ["error"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "prefer-const": "error",
    "no-irregular-whitespace": "error",
    "no-trailing-spaces": "error",
    semi: "error",
    "no-empty-function": "error",
    "no-duplicate-imports": "error",
    "newline-after-var": "error",
    camelcase: "error",
  },
};
