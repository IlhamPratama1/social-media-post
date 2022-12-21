module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
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
  },
  globals: {
    process: "readonly",
    __dirname: "readonly",
  },
};
