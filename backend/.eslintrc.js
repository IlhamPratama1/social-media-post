module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["jest", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-vars": ["warn"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
  },
  globals: {
    process: "readonly",
    __dirname: "readonly",
  },
};
