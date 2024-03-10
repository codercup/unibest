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
    <wd-button @click="handleClick">展示幕帘</wd-button>
    <wd-curtain
      :value="value"
      :to="link"
      :width="300"
      src="https://via.placeholder.com/400x200.png/3c9cff/fff"
      @close="handleClose"
    ></wd-curtain>
  </view>
</template>

<script lang="ts" setup>
const value = ref<boolean>(false)
const link = ref<string>('/pages/index/index')

function handleClick() {
  value.value = true
}

function handleClose() {
  value.value = false
}
</script>

<style lang="scss" scoped>
//
</style>
