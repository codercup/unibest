<template>
  <view class="tabbar-box">
    <view class="items" v-for="(item, index) in tabItems" :key="index" @click="toPage(item.url)">
      <wd-icon :name="item.icon" size="22px"></wd-icon>
      <text>{{ item.title }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  tabItems: {
    type: Array,
    required: true,
    validator(value) {
      return value.every(
        (item) =>
          Object.prototype.hasOwnProperty.call(item, 'url') &&
          Object.prototype.hasOwnProperty.call(item, 'icon') &&
          Object.prototype.hasOwnProperty.call(item, 'title'),
      )
    },
  },
})

const toPage = (url: string) => {
  uni.switchTab({ url }) // 确保传入的是tabBar页面的URL
}

onLoad(() => {
  uni.hideTabBar()
})
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
