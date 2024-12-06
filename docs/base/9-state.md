# 状态篇

本文主要介绍了全局状态管理 `pinia` 和 简单状态 `ref` + `reactive`。

## pinia

`unibest` 已经内置了 `Pinia` + `pinia-plugin-persistedstate`(数据持久化插件)，并提供了开箱即用的示例。

### 兼容性处理

本身 `pinia-plugin-persistedstate` 是不支持 `uniapp` 的，但是 `pinia-plugin-persistedstate` 提供了修改 `storage` 存储 API 的方式（默认是 `localStorage`，是一个 `WEB API`，`非H5端` 不支持），目前 `unibest` 已经处理好了。关键代码如下：

```ts
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

const store = createPinia()
store.use(
  createPersistedState({
    storage: {
      getItem: uni.getStorageSync, // 看这里
      setItem: uni.setStorageSync, // 看这里
    },
  }),
)
```

### 定义 `pinia` 全局状态

`src/store/xxx.ts` 里面编写代码，如下是 `src/store/count.ts` 文件。

注意 `defineStore` 第三个参数可以设置是否需要持久化，默认不需要。

```ts [src/store/count.ts]{26}
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore(
  'count',
  () => {
    const count = ref(0)
    const increment = () => {
      count.value++
    }
    const decrement = () => {
      count.value--
    }
    const reset = () => {
      count.value = 0
    }
    return {
      count,
      decrement,
      increment,
      reset,
    }
  },
  {
    // 如果需要持久化就写 true, 不需要持久化就写 false（或者去掉这个配置项）
    persist: true,
  },
)
```

> 请不要随意把数据丢到 `pinia`，能不用就不用。简单状态尽量使用 `ref` 或者 `reactive`。

### 使用 `pinia` 全局状态

在 `vue` 文件中就可以使用了，如下是 `src/pages/demo.vue` 文件：

```vue
<template>
  <view class="flex justify-center items-center text-blue-500 mt-4 mb-4">
    <view class="w-20">Count: {{ countStore.count }}</view>
    <button class="ml-2 mr-2" @click="countStore.decrement">-1</button>
    <button class="ml-2 mr-2" @click="countStore.increment">+1</button>
    <button class="ml-2 mr-2" @click="countStore.reset">重置</button>
  </view>
</template>

<script lang="ts" setup>
import { useCountStore } from '@/store'

const countStore = useCountStore()
</script>
```

## 简单状态

你可以直接使用 `Vue` 提供的 `ref` 或 `reactive` 方法来做简单状态管理。

### ref

如下是 `src/pages/demo/useCount.ts` 文件，定义简单状态。

```ts [src/pages/demo/useCount.ts]
// 全局状态
const globalCount = ref(1)
export function useCount() {
  // 本地状态
  const localCount = ref(1)
  function increment() {
    globalCount.value++
    localCount.value++
  }
  return {
    globalCount,
    localCount,
    increment,
  }
}
```

如下是 `src/pages/demo/index.vue`，与 `ref` 简单状态文件放到同一个目录下，方便管理。

```vue [src/pages/demo/index.vue]
<script setup lang="ts">
import useCount from './useCount.ts'
const { globalCount, localCount, increment } = useCount()
</script>

<template>
  <button @click="increment()">
    {{ globalCount }}
    {{ localCount }}
  </button>
</template>
```

## reactive

`reactive` 与 `ref` 类似。

如下是 `src/pages/demo/count.ts` 文件，定义状态。

```ts [src/pages/demo/count.ts]
export const countStore = reactive({
  count: 0,
  increment() {
    this.count++
  },
})
```

如下是 `src/pages/demo/index.vue`，与 `reactive` 简单状态文件放到同一个目录下，方便管理。

```vue [src/pages/demo/index.vue]
<script setup lang="ts">
import { countStore } from './count.ts'
</script>

<template>
  <button @click="countStore.increment()">
    {{ countStore.count }}
  </button>
</template>
```

## 总结

本文介绍了 `unibest` 里面状态管理的 `2` 种方式：`pinia` 全局状态 和 `ref\reactive` 简单状态，分别演示了如何定义状态和使用状态。

注意需要灵活使用 `pinia` 和 `简单状态`，局部的状态尽量使用 `简单状态` 的方式来处理，减少 `pinia` 里面全局变量的数量。

全文完~
