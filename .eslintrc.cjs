module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    // eslint-plugin-import 插件， @see https://www.npmjs.com/package/eslint-plugin-import
    'plugin:import/recommended',
    // eslint-config-airbnb-base 插件， tips: 本插件也可以替换成 eslint-config-standard
    'airbnb-base',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended',
    'vue-global-api',
    './.eslintrc-auto-import.json',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'vue',
    // 2. 加入 prettier 的 eslint 插件
    'prettier',
    // eslint-import-resolver-typescript 插件，@see https://www.npmjs.com/package/eslint-import-resolver-typescript
    'import',
  ],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'prettier/prettier': 'error',
    // turn on errors for missing imports
    'import/no-unresolved': 'off',
    // 对后缀的检测，否则 import 一个ts文件也会报错，需要手动添加'.ts', 增加了下面的配置后就不用了
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    // 只允许1个默认导出，关闭，否则不能随意export xxx
    'import/prefer-default-export': ['off'],
    'no-console': ['off'],
    // 'no-unused-vars': ['off'],
    // '@typescript-eslint/no-unused-vars': ['off'],
    // 解决vite.config.ts报错问题
    'import/no-extraneous-dependencies': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off',
  },
  // eslint-import-resolver-typescript 插件，@see https://www.npmjs.com/package/eslint-import-resolver-typescript
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  globals: {
    uni: true,
    UniApp: true,
    wx: true,
    WechatMiniprogram: true,
    getCurrentPages: true,
    UniHelper: true,
    Page: true,
    App: true,
  },
}
