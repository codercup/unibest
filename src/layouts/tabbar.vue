<template>
  <view class="global-page-color p-3">
    <wd-config-provider theme="light">
      <slot />
      <view>
        <wd-tabbar
          fixed
          v-model="tabbarStore.tabbarInfo.activeIndex"
          @change="tabbarChange"
          shape="round"
          bordered
          safeAreaInsetBottom
          placeholder
        >
          <wd-tabbar-item title="首页" icon="home"></wd-tabbar-item>
          <wd-tabbar-item title="任务" icon="view-module" :value="5"></wd-tabbar-item>
          <wd-tabbar-item title="结算" icon="chart" :value="2"></wd-tabbar-item>
          <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
        </wd-tabbar>
      </view>
      <wd-toast />
      <wd-message-box />
    </wd-config-provider>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTabbarStore } from '@/store'
const tabbarStore = useTabbarStore()

const tabbarViewList: string[] = [
  '/pages/home/home',
  '/pages/task/task',
  '/pages/settlement/settlement',
  '/pages/profile/profile',
]

function tabbarChange({ value }: { value: string }) {
  console.log(`选中标签:${value}`)
  console.log(tabbarViewList[value])
  uni.redirectTo({ url: tabbarViewList[value] })
  tabbarStore.tabbarInfo.activeIndex = Number(value)
}
</script>

<style scoped>
.main-view {
  padding: 0 10rpx;
}
.global-page-color {
  background-color: red;
}
</style>
