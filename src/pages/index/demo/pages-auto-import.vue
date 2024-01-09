<route lang="json5">
{
  style: { navigationBarTitleText: 'pages 自动导入' },
}
</route>

<template>
  <view class="m-4">
    <view>vite.config.ts里面没有配置exclude的都会自动导入</view>
    <view>测试是否会自动引入到pages，发现会，成功！</view>
  </view>
</template>
