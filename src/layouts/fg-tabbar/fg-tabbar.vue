<template>
  <wd-tabbar
    v-if="CUSTOM_TABBAR_ENABLE"
    fixed
    v-model="tabbarStore.curIdx"
    bordered
    safeAreaInsetBottom
    placeholder
    @change="selectTabBar"
  >
    <block v-for="(item, idx) in tabbarList" :key="item.path">
      <wd-tabbar-item
        v-if="item.iconType === 'wot'"
        :title="item.text"
        :icon="item.icon"
      ></wd-tabbar-item>
      <wd-tabbar-item
        v-else-if="item.iconType === 'unocss' || item.iconType === 'iconfont'"
        :title="item.text"
      >
        <template #icon>
          <view
            h-40rpx
            w-40rpx
            :class="[item.icon, idx === tabbarStore.curIdx ? 'is-active' : 'is-inactive']"
          ></view>
        </template>
      </wd-tabbar-item>
      <wd-tabbar-item v-else-if="item.iconType === 'local'" :title="item.text">
        <template #icon>
          <image :src="item.icon" h-40rpx w-40rpx />
        </template>
      </wd-tabbar-item>
    </block>
  </wd-tabbar>
  <view v-else></view>
</template>

<script setup lang="ts">
import { tabbarList as _tabBarList, CUSTOM_TABBAR_ENABLE } from './tabbarList'
import { tabbarStore } from './tabbar'

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = _tabBarList.map((item) => ({ ...item, path: `/${item.pagePath}` }))
function selectTabBar({ value: index }: { value: number }) {
  const url = tabbarList[index].path
  tabbarStore.setCurIdx(index)
  if (CUSTOM_TABBAR_ENABLE) {
    uni.navigateTo({ url })
  } else {
    uni.switchTab({ url })
  }
}
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  // !CUSTOM_TABBAR_ENABLE &&
  //   uni.hideTabBar({
  //     fail(err) {
  //       console.log('hideTabBar fail: ', err)
  //     },
  //     success(res) {
  //       console.log('hideTabBar success: ', res)
  //     },
  //   })
})
</script>
