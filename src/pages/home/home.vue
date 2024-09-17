<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="home">
    <view class="search" @click="navToSearchPage">
      <wd-search
        custom-class="custom-search"
        hide-cancel
        placeholder-left
        disabled
        placeholder="公众号入门指导手册"
      />
    </view>
    <view class="card-swiper">
      <wd-swiper
        :list="swiperList"
        autoplay
        v-model:current="current"
        :indicator="{ type: 'dots-bar' }"
        @click="handleClick"
        @change="onChange"
      ></wd-swiper>
    </view>
    <view class="content-center">
      <view class="content-center-title">赛道中心</view>
      <view class="home-content-list">
        <wd-card>
          <template #title>
            <view class="title">
              <view>2020-02-03服务到期</view>
              <view class="title-tip">
                <wd-icon name="warning" size="14px" custom-style="vertical-align: bottom" />
                您可以去电脑上使用该服务
              </view>
            </view>
          </template>
          <view style="height: 40px" class="content">
            <image
              src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
              width="40"
              height="40"
              alt="joy"
              style="margin-right: 12px; border-radius: 4px; width: 40px; height: 40px"
            />
            <view>
              <view style=" font-size: 16 px ;c olor: rgba(0,0,0,0.85)">智催评营销</view>
              <view style=" font-size: 12 px ;c olor: rgba(0,0,0,0.25)">
                高级版-快速吸粉 | 周期一年
              </view>
            </view>
          </view>

          <template #footer>
            <view>
              <wd-button size="small" style="margin-right: 8px">评价</wd-button>
              <wd-button size="small" plain>立即使用</wd-button>
            </view>
          </template>
        </wd-card>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
//   ----------   轮播图  -------------------
const current = ref<number>(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

function navToSearchPage(value: any) {
  console.log(value)
}

//   ----------   赛道中心  -------------------
const contentCenterList = ref([{ title: '111' }, { title: '222' }])
</script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}

.home {
  .search {
    margin-bottom: 20rpx;
    :deep(.custom-search) {
      padding: 0;
    }
    .wd-search {
      background-color: transparent;
    }
  }
}

.content,
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.25);
}
.content image {
  margin-right: 12rpx;
  border-radius: 4rpx;
}

.content-center {
  background-color: #d14328;
}

.content-center .content-center-title {
  font-size: 20rpx;
  margin: 10rpx 20rpx;
}
</style>
