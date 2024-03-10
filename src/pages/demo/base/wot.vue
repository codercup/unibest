<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: 'wot',
  },
}
</route>

<template>
  <view class="center pt-4 flex-col">
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>
  </view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
//
</style>
