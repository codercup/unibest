# 样式和 CSS 开发规范

## UnoCSS 原子化 CSS
- 项目使用 UnoCSS 作为原子化 CSS 框架
- 配置在 [uno.config.ts](mdc:uno.config.ts)
- 支持预设和自定义规则
- 优先使用原子化类名，减少自定义 CSS

## SCSS 规范
- 使用 SCSS 预处理器
- 样式文件使用 `lang="scss"` 和 `scoped` 属性
- 遵循 BEM 命名规范
- 使用变量和混入提高复用性

## 样式组织
- 全局样式在 [src/style/](mdc:src/style/) 目录下
- 组件样式使用 scoped 作用域
- 图标字体在 [src/style/iconfont.css](mdc:src/style/iconfont.css)
- 主题变量在 [src/uni_modules/uni-scss/](mdc:src/uni_modules/uni-scss/) 目录下

## 示例代码结构
```vue
<template>
  <view class="container flex flex-col items-center p-4">
    <text class="title text-lg font-bold mb-2">标题</text>
    <view class="content bg-gray-100 rounded-lg p-3">
      <!-- 内容 -->
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  
  .title {
    color: var(--primary-color);
  }
  
  .content {
    width: 100%;
    max-width: 600rpx;
  }
}
</style>

## 响应式设计
- 使用 rpx 单位适配不同屏幕
- 支持横屏和竖屏布局
- 使用 flexbox 和 grid 布局
- 考虑不同平台的样式差异
---
globs: *.vue,*.scss,*.css
---
