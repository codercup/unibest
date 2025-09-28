<script lang="ts" setup>
// code here
import RequestComp from './components/request.vue'

definePage({
  style: {
    navigationBarTitleText: '分包页面',
  },
})

function gotoScroll() {
  uni.navigateTo({
    url: '/pages-sub/demo/scroll',
  })
}
</script>

<template>
  <view class="text-center">
    <view class="m-8">
      http://localhost:9000/#/pages-sub/demo/index
    </view>
    <view class="my-4 text-green-500">
      分包页面demo
    </view>
    <view class="text-blue-500">
      分包页面里面的components示例
    </view>
    <button class="my-4" type="primary" size="mini" @click="gotoScroll">
      跳转到上拉刷新和下拉加载更多
    </button>
    <view>
      <RequestComp />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
