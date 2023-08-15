module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vuetify/base'
  ],
  parserOptions: {
    ecmaVersion: 2022
  },
  rules: {
    'no-console': 'off',
    'vue/no-side-effects-in-computed-properties': 'warn',
    radix: 'error'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ]
    }
  ]
}
