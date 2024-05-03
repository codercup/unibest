<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '上传',
  },
}
</route>

<template>
  <view class="p-4 text-center">
    <wd-button @click="chooseImage">选择图片并上传</wd-button>
    <view class="m-2">上传后返回的图片地址：</view>
    <view class="m-2">{{ imgStr }}</view>
    <view class="h-80 w-full">
      <image v-if="imgStr" :src="imgStr" mode="scaleToFill" />
    </view>
  </view>
</template>

<script lang="ts" setup>
const imgStr = ref('')

const chooseImage = () => {
  // #ifdef MP-WEIXIN
  // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
  // 微信小程序在2023年10月17日之后，使用本API需要配置隐私协议
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      console.log(res)
      const tempFilePath = res.tempFiles[0].tempFilePath
      uni.uploadFile({
        url: 'https://ukw0y1.laf.run/uploadFile',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          user: '菲鸽',
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data)
          imgStr.value = uploadFileRes.data
        },
      })
    },
  })
  // #endif
  // #ifndef MP-WEIXIN
  uni.chooseImage({
    count: 1,
    success: (res) => {
      console.log(res)
      const tempFilePath = res.tempFilePaths[0]
      uni.uploadFile({
        url: 'https://ukw0y1.laf.run/uploadFile',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          user: '菲鸽',
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data)
          imgStr.value = uploadFileRes.data
        },
      })
    },
  })
  // #endif
}
</script>

<style lang="scss" scoped>
//
</style>
