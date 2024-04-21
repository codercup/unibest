<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'UnoCss Icons 使用' },
}
</route>

<template>
  <view class="m-4">
    <view class="mb-2">
      这里只装了carbon的图表库，网址：
      <a href="https://icones.js.org/collection/carbon" target="_blank">
        https://icones.js.org/collection/carbon
      </a>
      (非H5环境，请使用浏览器打开)
    </view>
    <view class="i-carbon-car" />
    <view class="i-carbon-car text-red" />
    <button class="i-carbon-sun dark:i-carbon-moon" />
    <view class="h-10"></view>
    <view class="i-carbon-user-avatar text-red" />
    <view :class="`i-carbon-user-avatar`" />
    <view :class="iconName" />
  </view>
</template>

<script lang="ts" setup>
const iconName = ref<string>('i-carbon-car')
onLoad(() => {
  setTimeout(() => {
    iconName.value = 'i-carbon-user-avatar'
  }, 1000)
})
</script>
