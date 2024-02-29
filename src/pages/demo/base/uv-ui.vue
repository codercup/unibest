<route lang="json5" type="page">
{
  style: { navigationBarTitleText: 'uv ui' },
}
</route>

<template>
  <view class="mt-10">
    <uv-button type="primary" @click="remakeQc">重新生成二维码</uv-button>
    <view class="center mt-8">
      <uv-qrcode
        ref="qrcode"
        size="200px"
        value="https://h5.uvui.cn"
        :options="options"
      ></uv-qrcode>
    </view>
  </view>
</template>

<script lang="ts" setup>
console.log(uni.$uv.os())
console.log(uni.$uv.sys())
console.log(uni.$uv.trim(' abc ')) // 去除两端空格
console.log(uni.$uv.random(1, 3)) // 获取随机数
const qrcode = ref(null)
const options = reactive({
  size: 300,
  useDynamicSize: false,
  margin: 10,
  backgroundColor: '#fff',
  // 指定二维码前景，一般可在中间放logo
  foregroundImageSrc: '/static/logo.svg',
})
const remakeQc = () => {
  qrcode.value.remake({
    success: () => {
      console.log('生成成功')
    },
    fail: (err) => {
      console.log(err)
    },
  })
}
</script>

<style lang="scss" scoped>
//
</style>
