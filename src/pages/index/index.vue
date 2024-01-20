<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: { navigationBarTitleText: '首页' },
}
</route>
<template>
  <view class="bg-white h-full overflow-hidden pt-24 px-4">
    <view class="mt-8">
      <image src="/static/logo.png" alt="" class="w-20 h-20 block mx-auto" />
      <view class="text-2xl text-center mt-4 font-bold"> vue3-uniapp-template </view>
    </view>
    <view class="mt-8">
      <view class="text-center mt-4 font-bold">开箱即用的 uniapp+vue3+ts 模板</view>
      <!--
        <view class="mt-8">果然UniIcons 在 微信小程序下颜色丢失</view>
        <uni-icons type="contact" size="30"></uni-icons>
        <uni-icons type="contact" size="30" color="red"></uni-icons>
        <view mt-4>UnoCSS Icons就正常，以后还是多用UnoCSS Icons 吧</view>
        <view class="i-carbon-car" />
        <view class="i-carbon-car text-red" />
      -->
    </view>
  </view>
</template>

<script lang="ts" setup></script>
