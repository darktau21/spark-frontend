import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import pluginVue from 'eslint-plugin-vue';
import tsLint from 'typescript-eslint';

export default [
  {
    ignores: ['**/*.cjs', '**/*.mjs'],
  },
  eslint.configs.recommended,
  ...tsLint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  perfectionistNatural,
  eslintConfigPrettier,
  {
    files: ['src/**/*.{ts,tsx,js,jsx,vue}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        extraFileExtensions: ['.vue'],
        parser: tsLint.parser,
        project: './tsconfig.app.json',
        sourceType: 'module',
      },
    },
    plugins: {
      'typescript-eslint': tsLint,
    },
    rules: {
      'perfectionist/sort-vue-attributes': 'off',
      'vue/require-default-prop': 'off',
    },
  },
];
