module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        es2021: true,
        node: true,
        jest: true,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    root: true,
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            alias: {
                map: [
                    ['@addess/*', './src/address'],
                    ['@profile/*', './src/profile'],
                    ['@postalcode/*', './src/postalcode']
                ],
                extensions: ['.ts'],
            },
        },
    },
    rules: {
        'no-console': 'warn',
        'import/extensions': 'off',
        'class-methods-use-this': 'off',
        'object-curly-newline': 'warn',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'no-restricted-syntax': 'off',
        'import/no-unresolved': 'warn',
        'prefer-destructuring': ['error', { array: false, object: true }],
        'no-unused-vars': 'off',
        'max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-cycle': 'warn',
    },
};
