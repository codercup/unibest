module.exports = {
  header: '## 变更日志\n', // 可自定义添加生成的changelog头部内容
  types: [
    { type: 'feat', section: '✨ Features | 新功能' },
    { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
    // { type: 'init', section: '🎉 Init | 初始化' },
    // { type: 'docs', section: '✏️ Documentation | 文档' },
    // { type: 'style', section: '💄 Styles | 风格' },
    // { type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
    // { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
    // { type: 'test', section: '✅ Tests | 测试' },
    // { type: 'revert', section: '⏪ Revert | 回退' },
    // { type: 'build', section: '📦 Build System | 打包构建' },
    // { type: 'update', section: '🚀 update | 构建/工程依赖/工具升级' },
    // { type: 'tool', section: '🚀 tool | 工具升级' },
    // { type: 'ci', section: '👷 Continuous Integration | CI 配置' },
  ],
  // 跳过相关内容
  skip: {
    bump: false, // 是否跳过更改版本
    changelog: false, // 是否跳过生产changelog
    commit: false, // 是否跳过自动commit
    tag: false, // 是否跳过打tag
  },
}
