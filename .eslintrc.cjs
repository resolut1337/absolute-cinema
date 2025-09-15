/* eslint-env node */
module.exports = {
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: { react: { version: '18.0' } },
  parserOptions: { ecmaVersion: 11, sourceType: 'module' },
  plugins: ['react'],
  rules: { 'react/prop-types': 'off' },
}
