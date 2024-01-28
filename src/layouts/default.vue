<template>
  <view class="default-layout">
    <slot />
    <view class="text-gray-400 m-auto mt-12">[default layout]</view>
  </view>
</template>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;

  // #ifdef MP-WEIXIN
  height: 100%;

  // #endif
  // #ifndef MP-WEIXIN
  min-height: 100%;

  // #endif
  overflow: hidden;
}
</style>
