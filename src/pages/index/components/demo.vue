<template>
  <view>
    <view>demo</view>
    <view>测试是否会自动引入到pages，发现会，除非增加exclude配置</view>
    <view>需要在vite.config.ts（注意不是pages.config.ts）中UniPages()配置exclude</view>
    <view>配置如下: </view>
    <pre>
export default defineConfig({
  plugins: [
    UniPages({
      exclude: ['**/components/**/**.*'],
    }),
    uni(),
  ],
})
    </pre>
  </view>
</template>
