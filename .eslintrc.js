module.exports = {
  env: {
    "cypress/globals": true,
  },
  extends: ["plugin:prettier/recommended", "plugin:cypress/recommended"],
  plugins: ["cypress", "prettier"],
  rules: {
    "no-unused-expressions": 0,
  },
};
