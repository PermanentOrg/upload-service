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

			// 0 is used for checking if an array is empty; this will unfortunately allow magic 0's in some contexts
			// but we preferred to override the rule here as opposed to writing `isEmptyArray` with disabled linting
			"@typescript-eslint/no-magic-numbers": [
				"error",
				{ ignore: [0], ignoreEnums: true },
			],
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
			"max-lines": "off",
			"@typescript-eslint/no-magic-numbers": "off",

			// We sometimes need to define mocked functions at the top of test files
			// due to the way jest hoists `mock()` calls.
			// If / when we create better mock utilities we can remove this override.
			"import/first": "off",
		},
	},
]);
