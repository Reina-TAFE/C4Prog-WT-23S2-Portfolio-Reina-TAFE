export default [
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
    }
];
