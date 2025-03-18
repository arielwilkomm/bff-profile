import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        alias: {
          map: [
            ['@environment/*', './src/environment'],
            ['@health/*', './src/health'],
            ['@constants/*', './src/common/constants'],
            ['@address/*', './src/address'],
            ['@profile/*', './src/profile'],
            ['@postalcode/*', './src/postalcode'],
          ],
          extensions: ['.ts'],
        },
      },
    },
  },
  {
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
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  }
);