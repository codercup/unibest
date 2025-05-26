<script lang="ts" setup>
withDefaults(defineProps<{
  leftText?: string;
  rightText?: string;
  leftArrow?: boolean;
  bordered?: boolean;
  fixed?: boolean;
  placeholder?: boolean;
  zIndex?: number;
  safeAreaInsetTop?: boolean;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
}>(), {
  leftText: '返回',
  rightText: '',
  leftArrow: true,
  bordered: true,
  fixed: false,
  placeholder: true,
  zIndex: 1,
  safeAreaInsetTop: true,
  leftDisabled: false,
  rightDisabled: false,
});

function handleClickLeft() {
  uni.navigateBack({
    fail() {
      uni.reLaunch({
        url: '/pages/index/index',
      });
    },
  });
}
</script>

<template>
  <wd-navbar
    :left-text="leftText" :right-text="rightText" :left-arrow="leftArrow"
    :bordered="bordered" :fixed="fixed" :placeholder="placeholder" :z-index="zIndex"
    :safe-area-inset-top="safeAreaInsetTop" :left-disabled="leftDisabled" :right-disabled="rightDisabled"
    @click-left="handleClickLeft"
  >
    <template #title>
      <slot />
    </template>
  </wd-navbar>
</template>
