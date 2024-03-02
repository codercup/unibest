<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'auto import component' },
}
</route>
<template>
  <div>
    <h1>欢迎使用 unibest</h1>
    <view class="h-10"></view>
    <AppTest> 这个组件会自动导入 </AppTest>
    <view class="h-10"></view>
    <AppTest2> 这个组件会自动导入 </AppTest2>
  </div>
</template>
