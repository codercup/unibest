<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '图片压缩' },
}
</route>

<template lang="">
  <view class="m-4 text-center">
    <view class="mb-2 text-orange-500">
      原始图片是一个很大的，2.5M，build之后生成的图片只有1.1M，体积下降 56%
    </view>
    <image
      src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/img-min/bg-1.png"
      mode="scaleToFill"
    />
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
