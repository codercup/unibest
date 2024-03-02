<route lang="json5">
{
  style: { navigationBarTitleText: '自定义导航栏', navigationStyle: 'custom' },
}
</route>

<template>
  <uni-nav-bar
    title="自定义导航栏"
    left-icon="left"
    @clickLeft="goBack"
    class="fixed w-full"
  ></uni-nav-bar>
  <view class="h-11"></view>
  <fly-content :line="20" />
</template>

<script lang="ts" setup>
const goBack = () => {
  uni.navigateBack()
}
</script>
