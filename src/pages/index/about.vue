<route lang="json5">
{
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view
    class="bg-white h-full overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center text-4xl mt-4">关于页面</view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
