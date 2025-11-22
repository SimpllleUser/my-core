// eslint.config.cjs
const vue = require('eslint-plugin-vue');
const vuetifyConfig = require('eslint-config-vuetify'); // ← це функція
const prettier = require('eslint-config-prettier');

// Викликаємо функцію і беремо тільки те, що нам треба (rules + extends)
const vuetify = vuetifyConfig();

module.exports = [
  // 1. Vue 3 flat recommended
  ...vue.configs['flat/recommended'],

  // 2. Vuetify — вручну розпаковуємо його старий конфіг у flat-формат
  // (це єдиний спосіб, який працює на 100%)
  {
    // Копіюємо все, що повернув vuetify(), але у правильному вигляді
    ...(vuetify.extends ? { extends: vuetify.extends } : {}),
    ...(vuetify.plugins ? { plugins: vuetify.plugins } : {}),
    ...(vuetify.rules ? { rules: vuetify.rules } : {}),
    ...(vuetify.env ? { env: vuetify.env } : {}),
    ...(vuetify.parserOptions ? { parserOptions: vuetify.parserOptions } : {})
  },

  // 3. Перебиваємо тільки ті правила, які нам заважають
  {
    rules: {
      'vue/max-attributes-per-line': 'off', // головне!
      'vue/html-closing-bracket-newline': 'off', // друге головне
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off'
    }
  },

  // 4. Prettier — обов’язково останній
  prettier
];
