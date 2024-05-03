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
    <wd-button @click="run">选择图片并上传</wd-button>
    <view v-if="loading" class="text-blue h-10">上传...</view>
    <template v-else>
      <view class="m-2">上传后返回的图片地址：</view>
      <view class="m-2">{{ data }}</view>
      <view class="h-80 w-full">
        <image v-if="data" :src="data" mode="scaleToFill" />
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
const { loading, data, run } = useUpload<string>('https://ukw0y1.laf.run/upload', { user: '菲鸽' })
</script>

<style lang="scss" scoped>
//
</style>
