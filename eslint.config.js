//@ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionistNatural from 'eslint-plugin-perfectionist/configs/recommended-natural';
import pluginVue from 'eslint-plugin-vue';
import tsLint from 'typescript-eslint';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  eslint.configs.recommended,
  ...tsLint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  perfectionistNatural,
  {
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
  eslintConfigPrettier,
];
