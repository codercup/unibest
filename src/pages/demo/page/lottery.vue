<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '九宫格抽奖' },
}
</route>

<template>
  <view class="mt-4 h-10 text-center">九宫格抽奖</view>
  <view class="lottery-box">
    <view class="lottery-list">
      <view
        class="lottery-item"
        :class="{
          active: n === activeIndex,
          btn: n === btnIndex, // 最中间那个是展示按钮
        }"
        v-for="n in numList"
        :key="n"
        @click="handleClick(n)"
      >
        <view v-if="n === btnIndex">点击抽奖</view>
        <view v-else> {{ n }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'

const giftLen = 8 // 九宫格有8个礼物
const loop = 4 // 设置转多少圈，在最后一圈会慢下来
const totalStep = giftLen * loop // 总的步数 32
const lastLoopStep = totalStep - giftLen // 最后一圈，24
const numList = [1, 2, 3, 8, -1, 4, 7, 6, 5]
const btnIndex = numList[4] // 最中间那个是展示按钮

const state = reactive({
  lottery: 0, // 奖品
  step: -1, // 目前转动的步数
  stopStep: totalStep, // 停下来的时需要走的步数
  speed: 2, // 转动速度，我们是通过定时器去实现转动效果的，所以这也就是定时器的执行频率
  timer: null, // 定时器ID
  loading: false,
})
// 通过目前转动的步数来对8取模得到当前转到的格子索引
const activeIndex = computed(() => {
  return (state.step % 8) + 1
})

function run() {
  // 当前步数大于等于目标步数
  if (state.step >= state.stopStep) {
    // 清空定时器，停止转动
    clearTimeout(state.timer)
    // 将初始化步数为最终奖品的步数，转动速度也置为初始速度，下次才能正确转动
    state.step = state.lottery
    state.speed = 2
    state.loading = false
    console.log(`恭喜获得${activeIndex.value}号奖品`)
    uni.showModal({
      title: `恭喜获得${activeIndex.value}号奖品`,
    })
    return
  }
  // 转动到最后一圈时，增加speed，也就是定时器执行间隔时间变长，转动速度变慢
  if (state.step > lastLoopStep + state.lottery) {
    state.speed++
  }
  // 抽奖函数每执行一次，当前步数加一
  state.step++
  // 重新开启定时器执行抽奖函数
  state.timer = setTimeout(run, state.speed * 30)
}
// 点击抽奖之后调用的函数
function handleClick(n) {
  if (n !== btnIndex) {
    return
  }
  if (state.loading) return
  state.loading = true
  // 最终获得的奖品，实际业务中是通过接口获取的，这里使用随机数来模拟下
  state.lottery = Math.ceil(Math.random() * giftLen)
  console.log(state.lottery)
  // 计算总共要转动的步数，转4圈后再转到奖品处
  state.stopStep = state.lottery + totalStep
  // 执行抽奖函数
  run()
}
</script>

<style lang="css">
.lottery-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lottery-list {
  --size: 100px;

  display: flex;
  flex-wrap: wrap;
  width: calc(3 * var(--size) + 3px);
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.lottery-item {
  width: var(--size);
  height: var(--size);
  line-height: var(--size);
  text-align: center;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}

.lottery-item.active {
  color: #fff;
  background-color: red;
}

.lottery-item.btn {
  cursor: pointer;
}
</style>
