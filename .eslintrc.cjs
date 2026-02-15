module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  overrides: [
    {
      files: ['frontend/**/*.{js,jsx}'],
      env: {
        browser: true,
      },
    },
    {
      files: ['**/*.{test,spec}.{js,jsx}'],
      env: {
        jest: true,
      },
    },
  ],
};
