import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: importPlugin, // Aqui corrigimos o formato do plugin
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
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
      'import/no-cycle': 'warn',
    },
  }
);