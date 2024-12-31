<template>
  <view class="tabbar-box">
    <view
      class="items"
      @click="toPage('/pages/about/about')"
      v-for="(item, index) in 4"
      :key="index"
    >
      <wd-icon name="spool" size="22px"></wd-icon>
      <text>首页</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
onLoad(() => {
  uni.hideTabBar()
})

const toPage = (pages) => {
  uni.switchTab({ url: pages })
}
</script>

<style lang="scss" scoped>
.tabbar-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 996;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100rpx;
  border-top: 1rpx solid #f2f2f2;
}
.items {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
