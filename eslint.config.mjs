import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import love from "eslint-config-love";

export default defineConfig([
	js.configs.recommended,
	typescriptEslint.configs.eslintRecommended,
	typescriptEslint.configs.recommendedTypeChecked,
	typescriptEslint.configs.strict,
	love,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},

			ecmaVersion: 5,
			sourceType: "commonjs",

			parserOptions: {
				project: "./tsconfig.json",
			},
		},

		rules: {
			"lines-between-class-members": "off",
			"no-shadow": "off",
			"no-undef": "off",
			"no-unused-vars": "off",
			"no-use-before-define": "off",
			"require-await": "off",
			"import/prefer-default-export": "off",
			"import/no-default-export": "error",
			"import/extensions": "off",
			"import/no-unresolved": "off",
			"import/no-extraneous-dependencies": "off",
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/prefer-readonly-parameter-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-throw-literal": "off",

			// These are `love` rules that we were violating.  We should review these one at a time.
			"@typescript-eslint/no-magic-numbers": "off",
		},
	},
	{
		files: ["**/*.test.ts"],

		plugins: {
			jest,
		},

		rules: {
			"@typescript-eslint/unbound-method": "off",
			"jest/unbound-method": "error",
			"jest/no-focused-tests": "error",
			"max-lines": "off",
			"@typescript-eslint/no-magic-numbers": "off",

			// We sometimes need to define mocked functions at the top of test files
			// due to the way jest hoists `mock()` calls.
			// If / when we create better mock utilities we can remove this override.
			"import/first": "off",
		},
	},
]);
