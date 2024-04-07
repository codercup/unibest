// .stylelintrc.cjs

module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss', // tips: 本插件也可以替换成 stylelint-config-recommended-scss
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['**/*.{css,scss,vue}'],
      customSyntax: 'postcss-scss',
    },
  ],
  // 自定义规则
  rules: {
    // 允许 global 、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep'],
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    // 处理小程序page标签不认识的问题
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],
    'comment-empty-line-before': 'never',
    'custom-property-empty-line-before': 'never',
    'no-empty-source': null,
    'scss/comment-no-empty': null,
  },
}
