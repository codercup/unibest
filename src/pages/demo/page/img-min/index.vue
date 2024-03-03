<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '图片压缩' },
}
</route>

<script setup lang="ts">
import testBgImg from './test-bg.png'
</script>

<template>
  <view class="m-4 text-center">
    <view class="mb-2 text-orange-500">
      原始图片是一个很大的，2.5M，build之后生成的图片只有1.1M，体积下降 56%
    </view>
    <view class="mb-4 text-red-500">
      微信小程序有包体积的限制，图片通常使用线上地址，不用本地图片就用不上这个插件了。
    </view>
    <!-- #ifdef MP -->
    <image
      src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/img-min/bg-1.png"
      mode="scaleToFill"
    />
    <!-- #endif -->
    <!-- #ifndef MP -->
    <image :src="testBgImg" mode="scaleToFill" />
    <!-- #endif -->
    <view class="mb-4">对比图如下2图，如果看不清请看代码原图</view>
    <image
      src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/img-min/before.png"
      mode="widthFix"
      class="w-full"
    />
    <image
      src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/img-min/after.png"
      mode="widthFix"
      class="w-full"
    />
  </view>
</template>
