module.exports = {
  env: {
    'cypress/globals': true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'airbnb-base',
  ],
  plugins: ['cypress', 'prettier'],
  rules: {
    'no-unused-expressions': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': 0,
    'operator-linebreak': 0,
    'comma-style': 0,
    'comma-dangle': 0,
    'no-restricted-syntax': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  root: true,
};
