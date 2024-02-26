<route lang="json5" type="page">
{
  style: { navigationBarTitleText: 'uv ui' },
}
</route>

<template>
  <view class="mt-10">
    <uv-button type="primary">button</uv-button>
    <uv-qrcode ref="qrcode" class="m-auto" size="300px" value="https://h5.uvui.cn"></uv-qrcode>
  </view>
</template>

<script lang="ts" setup>
console.log(uni.$uv.os())
console.log(uni.$uv.sys())
console.log(uni.$uv.trim(' abc ')) // 去除两端空格
console.log(uni.$uv.random(1, 3)) // 获取随机数
</script>

<style lang="scss" scoped>
//
</style>
