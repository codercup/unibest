<template lang="">
  <view class="m-4 text-center">
    <view class="mb-2 text-orange-500">
      原始图片是一个很大的，2.5M，build之后生成的图片只有1.1M，体积下降 56%
    </view>
    <image :src="bgImg" mode="scaleToFill" />
    <view class="mb-4">对比图如下2图，如果看不清请看代码原图</view>
    <image :src="beforeImg" mode="widthFix" class="w-full" />
    <image :src="afterImg" mode="widthFix" class="w-full" />
  </view>
</template>

<script lang="ts" setup>
import bgImg from './bg-1.png'
import beforeImg from './before.png'
import afterImg from './after.png'
</script>
