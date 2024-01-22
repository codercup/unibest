<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '大转盘抽奖' },
}
</route>

<template>
  <view class="mt-4 h-10 text-center">大转盘抽奖</view>
  <div class="lottery-box">
    <div class="lottery-list">
      <div class="lottery-item" v-for="(n, index) in giftLen" :key="n">
        <div class="lottery-item-inner">
          <div class="lottery-item-gift">奖品{{ index + 1 }}</div>
        </div>
      </div>
      <div
        class="pointer"
        @click="handleClick"
        :style="{ transform: `rotate(${state.stopDeg}deg)` }"
      >
        <div>开始</div>
        <div>抽奖</div>
      </div>
    </div>
  </div>
  <view class="leading-8">
    <view class="mt-8 text-center text-green-600">下面是调试过程图片</view>
    <view class="mb-8 text-center text-green-600">欢迎感兴趣的玩家继续优化</view>
    <view class="text-center text-blue-600">计算lottery-item-inner节点的padding-left值</view>
    <image
      src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery/lottery2-1.png"
      mode="widthFix"
      class="w-full"
    />
    <view class="text-center text-blue-600">调整lottery-item-gift节点</view>
    <image
      src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery/lottery2-2.png"
      mode="widthFix"
      class="w-full"
    />
  </view>
</template>

<script lang="ts" setup>
const giftLen = 8
const deg = 360 / giftLen // 每份的角度
const loop = 4 // 转多少圈，4圈
const state = reactive({
  lottery: 0, // 本次抽奖的奖品索引
  lastLottery: 0, // 上一次抽奖的奖品索引
  stopDeg: 0, // 最终要旋转的角度
  loading: false,
})

function handleClick() {
  if (state.loading) return
  state.loading = true
  // 最终获得的奖品索引，实际业务中是通过接口获取的，这里使用随机数0~9来模拟下
  state.lottery = Math.floor(Math.random() * giftLen)
  console.log(state.lottery)
  // 最终的旋转角度，指针指向本次奖品的旋转角度+指针从上一次的奖品指向回归0的旋转角度+ 默认转动三圈
  state.stopDeg += (state.lottery + (giftLen - state.lastLottery)) * deg + loop * 360

  // uni不支持addEventListener所以改用下面的
  setTimeout(() => {
    state.lastLottery = state.lottery
    state.loading = false
    // alert(`恭喜获得奖品${state.lottery + 1}`)
    uni.showModal({
      title: `恭喜获得奖品${state.lottery + 1}`,
    })
  }, 3000)
}
</script>

<style lang="scss">
.lottery-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lottery-list {
  --size: 600rpx;
  --half: calc(var(--size) / 2);
  --len: 8; // 与代码 giftLen 长度一致
  --deg: calc(360 / var(--len) * 1deg);
  --deg-num: calc(360 / var(--len));

  position: relative;
  width: var(--size);
  height: var(--size);
  border: 2px solid #f55;
  border-radius: 50%;
}

.lottery-item {
  position: absolute;
  top: 0;
  left: var(--half);
  width: var(--half);
  height: var(--size);
  overflow: hidden; // 把这个注释掉可以看到最初的模样
  // background-color: #ff5350a1; // 放开这个可以看到最初的模样
  transform-origin: left center;
}

.lottery-item-inner {
  position: absolute;
  top: 0;
  left: calc(-1 * var(--half));
  box-sizing: border-box;
  width: var(--half);
  height: var(--size);
  padding-left: calc(((1 - sin(var(--deg-num))) * var(--size)));
  font-size: 12px;
  border-radius: var(--half) 0 0 var(--half);
  transform: rotate(var(--deg));
  transform-origin: right center;
}

.lottery-item-inner .lottery-item-gift {
  display: block;
  text-align: center;
  transform: rotate(calc(-0.5 * var(--deg))) translateY(16px)
    translateX(calc(0.5 * var(--half) * (1 - 1 / cos(0.5 * var(--deg)))));
  transform-origin: center;
}

.lottery-item:nth-child(2n + 1) .lottery-item-inner {
  background: #fef6e0a1;
}

.lottery-item:nth-child(2n) .lottery-item-inner {
  background: #ffffffa1;
}

// TIPS: 与上面的--len一致
@for $i from 1 through 8 {
  .lottery-item:nth-child(#{$i}) {
    transform: rotate(calc(($i - 1 - 0.5) * var(--deg)));
  }
}

.pointer {
  --pointer-size: 40px;
  --pointer-padding: calc(var(--pointer-size) / 5);

  position: absolute;
  top: calc(var(--half) - var(--pointer-size) / 2 - var(--pointer-padding));
  left: calc(var(--half) - var(--pointer-size) / 2 - var(--pointer-padding));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--pointer-size);
  height: var(--pointer-size);
  padding: var(--pointer-padding);
  font-size: 12px;
  text-align: center;
  background-color: #ffffffd1;
  border: 1px solid #ff5350;
  border-radius: 50%;
  transition: transform 3s cubic-bezier(0.2, 0.93, 0.43, 1);
}

.pointer::after {
  --caret-size: 8px;

  position: absolute;
  bottom: calc(var(--pointer-size) + var(--pointer-padding) * 2);
  left: calc(var(--pointer-size) / 2 - var(-caret-size) / 2);
  content: '';
  border-color: transparent;
  border-style: solid;
  border-width: calc(var(--caret-size) * 2) var(--caret-size);
  border-bottom-color: #ff5350;
  transform-origin: center;
}
</style>
