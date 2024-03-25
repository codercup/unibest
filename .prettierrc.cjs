// @see https://prettier.io/docs/en/options
module.exports = {
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  trailingComma: 'all',
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.json',
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
