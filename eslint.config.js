import { defineConfig } from "eslint/config";
import html from "@html-eslint/eslint-plugin";
import css from "@eslint/css";

export default defineConfig([
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'eqeqeq': 'error',
            'curly': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single']
        }
    },

    {
        files: ["**/*.html"],
        plugins: {html,},
        extends: ["html/recommended"],
        language: "html/html",
        rules: {
            "html/no-inline-styles": "warn",
            "html/require-closing-tags": "error",
            "html/no-duplicate-id": "error",
            "html/no-multiple-h1": "error"
        }
    },

    {
        files: ["**/*.css"],
        plugins: {css,},
        language: "css/css",
        rules: {
            "css/no-empty-blocks": "error",
            "css/no-invalid-properties": "error",
            "css/no-duplicate-imports": "error"
        }
    },
]);
