const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const playwright = require('eslint-plugin-playwright');
const prettier = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    ignores: ['.features-gen/**', 'playwright-report/**', 'test-results/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // this config file is plain CommonJS, unlike the rest of the TS codebase
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'readonly', __dirname: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['tests/**/*.ts', 'features/**/*.ts', 'authenticated/**/*.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // pages/*.ts wraps locator methods under names like `selectOption`; this
      // rule can't tell that apart from calling page.selectOption directly.
      'playwright/prefer-locator': 'off',
    },
  },
  {
    // step definitions put assertions inside Given/When/Then instead of test();
    // the plugin only recognizes the latter, so this rule false-positives here.
    files: ['features/steps/**/*.ts'],
    rules: {
      'playwright/no-standalone-expect': 'off',
    },
  },
  {
    // setup projects perform actions (e.g. logging in) with no assertions of their own.
    files: ['**/*.setup.ts'],
    rules: {
      'playwright/expect-expect': 'off',
    },
  },
  prettier,
);
