<route lang="json5" type="page">
{
  style: { navigationBarTitleText: 'waterfall' },
}
</route>

<template>
  <view class="waterfall">
    <uv-waterfall
      ref="waterfall"
      v-model="list"
      :add-time="10"
      :left-gap="leftGap"
      :right-gap="rightGap"
      :column-gap="columnGap"
      @changeList="changeList"
    >
      <!-- 第一列数据 -->
      <template v-slot:list1>
        <!-- 为了磨平部分平台的BUG，必须套一层view -->
        <view>
          <view v-for="item in lists.list1" :key="item.id" class="waterfall-item">
            <view class="waterfall-item__image" :style="[imageStyle(item)]">
              <image
                :src="item.image"
                mode="widthFix"
                :style="{ width: item.width + 'px' }"
              ></image>
            </view>
            <view class="waterfall-item__ft">
              <view class="waterfall-item__ft__title">
                <text class="value">{{ item.title }}</text>
              </view>
              <view class="waterfall-item__ft__desc uv-line-2">
                <text class="value">{{ item.desc }}</text>
              </view>
            </view>
          </view>
        </view>
      </template>
      <!-- 第二列数据 -->
      <template v-slot:list2>
        <!-- 为了磨平部分平台的BUG，必须套一层view -->
        <view>
          <view v-for="item in lists.list2" :key="item.id" class="waterfall-item">
            <view class="waterfall-item__image" :style="[imageStyle(item)]">
              <image
                :src="item.image"
                mode="widthFix"
                :style="{ width: item.width + 'px' }"
              ></image>
            </view>
            <view class="waterfall-item__ft">
              <view class="waterfall-item__ft__title">
                <text class="value">{{ item.title }}</text>
              </view>
              <view class="waterfall-item__ft__desc uv-line-2">
                <text class="value">{{ item.desc }}</text>
              </view>
            </view>
          </view>
        </view>
      </template>
    </uv-waterfall>
  </view>
</template>

<script lang="ts" setup>
const list = ref([]) // 瀑布流全部数据
const lists = reactive({
  list1: [], // 瀑布流第一列数据
  list2: [], // 瀑布流第二列数据
})
const leftGap = ref(10)
const rightGap = ref(10)
const columnGap = ref(10)

const imageStyle = computed(() => {
  return (item) => {
    const v = uni.upx2px(750) - leftGap.value - rightGap.value - columnGap.value
    const w = v / 2
    const rate = w / item.w
    const h = rate * item.h
    return {
      width: `${w}px`,
      height: `${h}px`,
    }
  }
})

onLoad(async () => {
  const { data } = await getData()
  list.value = data
})

const waterfall = ref()
// 如果页面还没渲染结束，页面就跳走，但此时@changeList回调还在返回数据，可能会造成渲染出错，所以要想办法停止渲染
onHide(() => {
  waterfall.value.clear()
})
// 这点非常重要：e.name在这里返回是list1或list2，要手动将数据追加到相应列
const changeList = (e: { name: 'list1' | 'list2'; value: any }) => {
  lists[e.name].push(e.value)
}
// 模拟的后端数据6
const getData = (): Promise<{ data: any[] }> => {
  return new Promise((resolve) => {
    const imgs = [
      { url: 'https://via.placeholder.com/100x110.png/3c9cff/fff', width: 100, height: 110 },
      { url: 'https://via.placeholder.com/200x220.png/f9ae3d/fff', width: 200, height: 220 },
      { url: 'https://via.placeholder.com/300x340.png/5ac725/fff', width: 300, height: 340 },
      { url: 'https://via.placeholder.com/400x400.png/f56c6c/fff', width: 400, height: 400 },
      { url: 'https://via.placeholder.com/500x510.png/909399/fff', width: 500, height: 510 },
      { url: 'https://via.placeholder.com/600x606.png/3c9cff/fff', width: 600, height: 606 },
      { url: 'https://via.placeholder.com/310x422.png/f1a532/fff', width: 310, height: 422 },
      { url: 'https://via.placeholder.com/320x430.png/3c9cff/fff', width: 320, height: 430 },
      { url: 'https://via.placeholder.com/330x424.png/f9ae3d/fff', width: 330, height: 424 },
      { url: 'https://via.placeholder.com/340x435.png/5ac725/fff', width: 340, height: 435 },
      { url: 'https://via.placeholder.com/350x440.png/f56c6c/fff', width: 350, height: 440 },
      { url: 'https://via.placeholder.com/380x470.png/909399/fff', width: 380, height: 470 },
    ]
    const arr = []
    const doFn = (i: number) => {
      const randomIndex = Math.floor(Math.random() * 10)
      return {
        id: uni.$uv.guid(),
        allowEdit: i === 0,
        image: imgs[randomIndex].url,
        w: imgs[randomIndex].width,
        h: imgs[randomIndex].height,
        title:
          i % 2 === 0
            ? `(${list.value.length + i + 1})体验uv-ui框架`
            : `(${list.value.length + i + 1})uv-ui支持多平台`,
        desc:
          i % 2 === 0
            ? `(${list.value.length + i + 1})欢迎使用uv-ui，uni-app生态专用的UI框架`
            : `(${list.value.length + i})开发者编写一套代码， 可发布到iOS、Android、H5、以及各种小程序`,
      }
    }
    // 模拟异步
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        arr.push(doFn(i))
      }
      resolve({ data: arr })
    }, 200)
  })
}
</script>
<style>
page {
  background: #f1f1f1;
}
</style>

<style lang="scss" scoped>
.waterfall-item {
  margin-top: 10px;
  overflow: hidden;
  border-radius: 6px;
  /* stylelint-disable-next-line selector-class-pattern */
  .waterfall-item__ft {
    padding: 20rpx;
    background: #fff;

    &__title {
      margin-bottom: 10rpx;
      font-weight: 700;
      line-height: 48rpx;

      .value {
        font-size: 32rpx;
        color: #303133;
      }
    }

    &__desc .value {
      font-size: 28rpx;
      color: #606266;
    }

    &__btn {
      padding: 10px 0;
    }
  }
}
</style>
