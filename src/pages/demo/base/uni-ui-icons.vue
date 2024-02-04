<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'UniUI Icons 使用' },
}
</route>

<template>
  <view class="m-4">
    <uni-icons type="contact" size="30"></uni-icons>
    <uni-icons type="contact" size="30" color="red"></uni-icons>
    <view class="text-blue-300"
      >注意在微信小程序中，不支持改颜色，即设置了颜色也会变成默认的#333, BUG</view
    >
  </view>
</template>
