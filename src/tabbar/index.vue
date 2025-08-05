<script setup lang="ts">
// 'i-carbon-code',
import { tabbarList as _tabBarList, customTabbarEnable, nativeTabbarNeedHide, tabbarCacheEnable } from './config'
import { tabbarStore } from './store'

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
// #endif

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = _tabBarList.map(item => ({ ...item, path: `/${item.pagePath}` }))
function handleClick(index: number) {
  // 点击原来的不做操作
  if (index === tabbarStore.curIdx) {
    return
  }
  const url = tabbarList[index].path
  tabbarStore.setCurIdx(index)
  if (tabbarCacheEnable) {
    uni.switchTab({ url })
  }
  else {
    uni.navigateTo({ url })
  }
}
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  nativeTabbarNeedHide
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      console.log('hideTabBar success: ', res)
    },
  })
})
const activeColor = '#1890ff'
const inactiveColor = '#666'
function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? activeColor : inactiveColor
}

function getImageByIndex(index: number, item: { iconActive: string, icon: string }) {
  return tabbarStore.curIdx === index ? item.iconActive : item.icon
}
</script>

<template>
  <view v-if="customTabbarEnable" class="h-50px pb-safe">
    <view class="border-and-fixed bg-white" @touchmove.stop.prevent>
      <view class="h-50px flex items-center">
        <view
          v-for="(item, index) in tabbarList" :key="index"
          class="flex flex-1 flex-col items-center justify-center"
          :style="{ color: getColorByIndex(index) }"
          @click="handleClick(index)"
        >
          <template v-if="item.iconType === 'uniUi'">
            <uni-icons :type="item.icon" size="20" :color="getColorByIndex(index)" />
          </template>
          <template v-if="item.iconType === 'uiLib'">
            <!-- TODO: 以下内容请根据选择的UI库自行替换 -->
            <!-- 如：<wd-icon name="home" /> (https://wot-design-uni.cn/component/icon.html) -->
            <!-- 如：<uv-icon name="home" /> (https://www.uvui.cn/components/icon.html) -->
            <!-- 如：<sar-icon name="image" /> (https://sard.wzt.zone/sard-uniapp-docs/components/icon)(sar没有home图标^_^) -->
            <wd-icon :name="item.icon" size="20" />
          </template>
          <template v-if="item.iconType === 'unocss' || item.iconType === 'iconfont'">
            <view :class="item.icon" class="text-20px" />
          </template>
          <template v-if="item.iconType === 'local'">
            <image :src="getImageByIndex(index, item)" mode="scaleToFill" class="h-20px w-20px" />
          </template>
          <view class="mt-2px text-12px">
            {{ item.text }}
          </view>
        </view>
      </view>
      <view class="pb-safe" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.border-and-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  border-top: 1px solid #eee;
  box-sizing: border-box;
}
</style>
