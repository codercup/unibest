<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '复制' },
}
</route>

<template>
  <view class="">
    <button @click="onCopy">复制</button>
  </view>
</template>

<script lang="ts" setup>
const onCopy = () => {
  uni.setClipboardData({
    data: '菲鸽，你最棒',
    fail: (fail) => {
      console.error('fail', fail)
    },
    success: (success) => {
      console.log('success', success)
    },
  })
}
</script>

<style lang="scss" scoped>
//
</style>
