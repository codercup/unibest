<template>
  <view class="tab-bar">
    <view class="content">
      <view
        class="one-tab"
        v-for="(item, index) in tabBarList"
        :key="index"
        @click="selectTabBar(index)"
      >
        <view>
          <view class="tab-img">
            <image v-if="tabIndex === index" class="img" :src="item.selectedIconPath"></image>
            <image v-else class="img" :src="item.iconPath"></image>
          </view>
        </view>
        <view v-if="tabIndex === index" class="tit select-texts">{{ item.text }}</view>
        <view v-else class="tit texts">{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useTabbarStore } from '@/store/tabbar'
import { storeToRefs } from 'pinia'

const tabbar = useTabbarStore()
const { tabBarList, tabIndex } = storeToRefs(tabbar)
const { setTabIndex } = tabbar

function selectTabBar(index: number) {
  setTabIndex(index)
  uni.switchTab({ url: tabBarList.value[index].pagePath })
}
</script>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  padding-top: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  background-color: #f8f8f8;

  .content {
    display: flex;

    .one-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;

      .tab-img {
        width: 50rpx;
        height: 50rpx;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      .tit {
        font-size: 30rpx;
        transform: scale(0.7);
      }

      .select-texts {
        color: #018d71;
      }

      .texts {
        color: block;
      }
    }
  }
}
</style>
