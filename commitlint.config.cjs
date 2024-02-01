// commitlint.config.cjs

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 'body-leading-blank': [2, 'always'], // 主体前有空行，默认就是 always
    // 'footer-leading-blank': [2, 'always'], // 末行前有空行，默认就是 always
    // 'header-max-length': [2, 'always', 108], // 首行最大长度，默认就是 always,72
    // 'subject-empty': [2, 'never'], // 标题不可为空，默认就是 never
    // 'type-empty': [2, 'never'], // 类型不可为空，默认就是 never

    // 允许的类型
    'type-enum': [
      2,
      'always',
      [
        'build', // 构造工具、外部依赖（webpack、npm）
        'chore', // 不涉及 src、test 的其他修改（构建过程或辅助工具的变更）
        'ci', // 修改项目继续集成流程（Travis，Jenkins，GitLab CI，Circle等）
        'docs', // 文档
        'feat', // 新增功能
        'fix', // bug 修复
        'perf', // 性能优化
        'refactor', // 重构
        'revert', // 回退
        'style', // 代码风格（不影响代码含义）
        'test', // 测试

        // 下面几个是自定义新增的
        'wip', // 开发中
        'refine', // 小优化，没有到 refactor 的程度
      ],
    ],
  },
}

// @see https://commitlint.js.org/#/reference-rules?id=type-enum
// 默认值为：
// [
//   'build',
//   'chore',
//   'ci',
//   'docs',
//   'feat',
//   'fix',
//   'perf',
//   'refactor',
//   'revert',
//   'style',
//   'test',
// ];
