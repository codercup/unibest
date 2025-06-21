import uniHelper from '@uni-helper/eslint-config'

export default uniHelper({
  unocss: true,
  vue: true,
  markdown: false,
  ignores: [
    'src/uni_modules/',
    'dist',
  ],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-refs': 'off',
    'unused-imports/no-unused-vars': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'jsdoc/check-param-names': 'off',
    'jsdoc/require-returns-description': 'off',
    'ts/no-empty-object-type': 'off',
    'no-extend-native': 'off',
  },
})
