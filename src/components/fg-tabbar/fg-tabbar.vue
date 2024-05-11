<template>
  <wd-tabbar
    fixed
    v-model="tabbarStore.curIdx"
    bordered
    safeAreaInsetBottom
    placeholder
    @change="selectTabBar"
  >
    <block v-for="(item, idx) in tabbarList" :key="item.path">
      <!-- <wd-tabbar-item v-if="item.isUnocssIcon" :title="item.text">
        <template #icon>
          <view
            h-40rpx
            w-40rpx
            :class="[item.icon, idx === tabbarStore.curIdx ? 'is-active' : 'is-inactive']"
          ></view>
        </template>
      </wd-tabbar-item> -->
      <wd-tabbar-item :title="item.text" :icon="item.icon"></wd-tabbar-item>
    </block>
  </wd-tabbar>
</template>

<script setup lang="ts">
import { tabBar } from '@/pages.json'
import { tabbarStore } from './tabbar'

/** tabbarList 里面的 path 必须和 pages.config.ts 的页面路径一致 */
const tabbarList = tabBar.list.map((item) => ({ ...item, path: `/${item.pagePath}` }))

function selectTabBar({ value: index }: { value: number }) {
  const url = tabbarList[index].path
  tabbarStore.setCurIdx(index)
  uni.switchTab({ url })
}
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  // #ifdef APP-PLUS
  uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      console.log('hideTabBar success: ', res)
    },
  })
  // #endif
})
</script>
