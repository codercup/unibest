<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'UniUI 使用' },
}
</route>

<template>
  <uni-card>
    <text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
  </uni-card>
  <view>微信里面下面的 uni-badge 显示不出来，BUG</view>
  <uni-badge text="99"></uni-badge>
</template>
