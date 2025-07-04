import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Enforces best practices for performance & accessibility
    "plugin:@typescript-eslint/recommended", // Recommended TypeScript rules
    "eslint:recommended", // Core ESLint recommendations
    "plugin:react/recommended"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // optional: enables rules that require type checking
      },
    },
    rules: {
      // Custom overrides (optional)
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
