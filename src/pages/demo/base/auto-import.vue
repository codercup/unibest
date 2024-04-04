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
    <AppTest>这个组件会自动导入</AppTest>
    <view class="h-10"></view>
    <AppTest2>这个组件会自动导入</AppTest2>
    <view class="text-red-700 mt-4">
      不可滥用自动导入，不是全局要用的组件不建议放到 `src/components` 里面，会增加包的体积
    </view>
  </div>
</template>
