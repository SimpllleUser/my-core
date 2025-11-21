// .eslintrc.js
const vuetify = require('eslint-config-vuetify');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    vuetify,
  ],
  plugins: ['sort-imports-es6-autofix'],
  rules: {
    // Vue rules
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/require-default-prop': 'off',

    // Import sorting
    'sort-imports-es6-autofix/sort-imports-es6': ['warn', {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    }],

    // Formatting
    'prettier/prettier': ['error', {
      singleQuote: true,
      printWidth: 120,
      endOfLine: 'lf',
    }],

    // Chaining
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
  },
};
