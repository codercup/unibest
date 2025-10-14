# 上拉刷新和下拉加载更多

在 unibest 框架中，我们通过组合 `useScroll` Hook 可结合 `scroll-view` 组件来轻松实现上拉刷新和下拉加载更多的功能。
场景一 页面滚动

```
definePage({
  style: {
    navigationBarTitleText: '上拉刷新和下拉加载更多',
    enablePullDownRefresh: true,
    onReachBottomDistance: 100,
  },
})
```

场景二 局部滚动 结合 `scroll-view`

## 关键文件

- `src/hooks/useScroll.ts`: 提供了核心的滚动逻辑处理 Hook。
- `src/pages-sub/demo/scroll.vue`: 一个具体的实现示例页面。

## `useScroll` Hook

`useScroll` 是一个 Vue Composition API Hook，它封装了处理下拉刷新和上拉加载的通用逻辑。

### 主要功能

- **管理加载状态**: 自动处理 `loading`（加载中）、`finished`（已加载全部）和 `error`（加载失败）等状态。
- **分页逻辑**: 内部维护分页参数（页码 `page` 和每页数量 `pageSize`）。
- **事件处理**: 提供 `onScrollToLower`（滚动到底部）、`onRefresherRefresh`（下拉刷新）等方法，用于在视图层触发。
- **数据合并**: 自动将新加载的数据追加到现有列表 `list` 中。

### 使用方法

```typescript
import { useScroll } from '@/hooks/useScroll'
import { getList } from '@/service/list' // 你的数据请求API

const {
  list, // 响应式的数据列表
  loading, // 是否加载中
  finished, // 是否已全部加载
  error, // 是否加载失败
  onScrollToLower, // 滚动到底部时触发的事件
  onRefresherRefresh, // 下拉刷新时触发的事件
} = useScroll(getList) // 将获取数据的API函数传入
```

## `scroll-view` 组件

`scroll-view` 是 uni-app 提供的可滚动视图区域组件，它提供了一系列属性来支持下拉刷新和上拉加载。

### 关键属性

- `scroll-y`: 允许纵向滚动。
- `refresher-enabled`: 启用下拉刷新。
- `refresher-triggered`: 控制下拉刷新动画的显示与隐藏，通过 `loading` 状态绑定。
- `@scrolltolower`: 滚动到底部时触发的事件，绑定 `onScrollToLower` 方法。
- `@refresherrefresh`: 触发下拉刷新时触发的事件，绑定 `onRefresherRefresh` 方法。

## 示例代码

以下是 `src/pages-sub/demo/scroll.vue` 中的核心代码，展示了如何将 `useScroll` 和 `scroll-view` 结合使用。

```vue
<template>
  <view class="scroll-page">
    <scroll-view
      class="scroll-view"
      scroll-y
      :refresher-enabled="true"
      :refresher-triggered="loading"
      @scrolltolower="onScrollToLower"
      @refresherrefresh="onRefresherRefresh"
    >
      <view v-for="item in list" :key="item.id" class="scroll-item">
        {{ item.name }}
      </view>

      <!-- 加载状态提示 -->
      <view v-if="loading" class="loading-tip">加载中...</view>
      <view v-if="finished" class="finished-tip">没有更多了</view>
      <view v-if="error" class="error-tip">加载失败，请重试</view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useScroll } from '@/hooks/useScroll'
import { getList } from '@/service/list'

const { list, loading, finished, error, onScrollToLower, onRefresherRefresh } = useScroll(getList)
</script>

<style scoped>
/* 样式省略 */
.scroll-page, .scroll-view {
  height: 100%;
}
</style>
```

## 实现步骤总结

1.  **创建API**: 确保你有一个返回分页数据的API请求函数（例如 `getList`），它应该接受页码和页面大小作为参数。
2.  **调用 `useScroll`**: 在你的页面脚本中，导入并调用 `useScroll` Hook，将你的API函数作为参数传入。
3.  **模板绑定**:
    -   使用 `scroll-view` 组件作为滚动容器。
    -   将其 `refresher-triggered` 属性绑定到 `useScroll` 返回的 `loading` 状态。
    -   将其 `@scrolltolower` 事件绑定到 `onScrollToLower` 方法。
    -   将其 `@refresherrefresh` 事件绑定到 `onRefresherRefresh` 方法。
4.  **渲染列表**: 使用 `v-for` 指令渲染 `useScroll` 返回的 `list` 数组。
5.  **添加加载提示**: 根据 `loading`, `finished`, `error` 状态，在列表底部显示不同的提示信息，提升用户体验。

通过以上步骤，你就可以在项目中快速集成一个功能完善、体验良好的上拉刷新和下拉加载列表。