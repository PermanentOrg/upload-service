import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";

export default defineConfig([
	js.configs.recommended,
	typescriptEslint.configs.eslintRecommended,
	typescriptEslint.configs.recommendedTypeChecked,
	typescriptEslint.configs.strict,
	prettier,
	{
		plugins: {
			import: importPlugin,
		},
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
			"dot-notation": "off",
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
		},
	},
]);
