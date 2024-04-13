<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '九宫格抽奖' },
}
</route>
<template>
  <view>
    <view class="container">
      <view
        class="gift-item"
        :class="{ active: currentIndex === index }"
        v-for="(item, index) in prizeList"
        :key="index"
        @click="start(index)"
      >
        <image :src="item.pic" class="gift-img" />
        <text v-if="index !== 4" class="gift-name">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

let isLeaved = false
// onBackPress(({ from }: { from: 'backbutton' | 'navigateBack' }) => {
//   console.log('onBackPress', from)
//   isLeaved = true
//   return false
// })

// onBackPress 有兼容性问题，统一使用 onUnload，测试验证OK
onUnload(() => {
  isLeaved = true
  console.log('onUnload', isLeaved)
})

const currentIndex = ref(0) // 当前位置
// 后台配置的奖品数据
const prizeList = [
  {
    id: 0,
    name: '双肩包',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/backpack.jpg',
  },
  {
    id: 1,
    name: '积木',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/jimu.jpg',
  },
  {
    id: 2,
    name: '红包',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/red-envelope.jpg',
  },
  {
    id: 3,
    name: '茶具',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/tea-set.jpg',
  },
  {
    id: 5,
    name: '可爱脸',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/tushetou.jpg',
  },
  {
    id: 6,
    name: '挖掘机',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/wajueji.jpg',
  },
  {
    id: 7,
    name: '无辜脸',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/xiaolian.jpg',
  },
  {
    id: 8,
    name: '烟灰缸',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/yanhuigang.jpg',
  },
]
const startBtn = {
  id: 4,
  name: '开始按钮',
  pic: 'https://img2.baidu.com/it/u=1497996119,382735686&fm=253',
}
// 九宫格中间位置插入开始按钮
prizeList.splice(4, 0, startBtn)

// 奖品高亮顺序
let prizeSort = [0, 1, 2, 5, 8, 7, 6, 3]

// 获取随机数
const getRandomNum = () => prizeSort[Math.floor(Math.random() * prizeSort.length)]

let isRunning = false // 是否正在抽奖
let speed = 10 // 抽奖转动速度
let timerIns = null // 定时器实例
let currentRunCount = 0 // 已跑次数
const totalRunCount = 32 // 总共跑动次数，8的倍数即可
let prizeId = 0 // 中奖id(0-8，不能是4)
let totalRunStep = 0 // 要执行总步数

const stopRun = () => {
  // eslint-disable-next-line no-unused-expressions
  timerIns && clearTimeout(timerIns)
}
const startRun = () => {
  stopRun()
  console.log(currentRunCount, totalRunStep)
  // 要执行总步数
  // 已走步数超过
  if (currentRunCount > totalRunStep) {
    isRunning = false
    if (isLeaved) {
      console.log('已经离开页面了，不用显示弹窗')
      return
    }
    const prizeName = prizeList.find((e) => e.id === prizeId)!.name
    uni.showModal({
      title: `恭喜你中奖 ${prizeName}`,
    })
    return
  }
  currentIndex.value = prizeSort[currentRunCount % 8]
  // 如果当前步数超过了2/3则速度慢下来
  if (currentRunCount > Math.floor((totalRunCount * 2) / 3)) {
    speed += Math.floor(currentRunCount / 3)
    console.log('速度>>>>', speed)
  }

  timerIns = setTimeout(() => {
    currentRunCount++
    startRun()
  }, speed)
}

const start = (i) => {
  if (i === 4 && !isRunning) {
    uni.showLoading()
    // 重置数据
    currentRunCount = 0
    speed = 100
    isRunning = true
    prizeSort = [
      ...prizeSort.slice(prizeSort.indexOf(prizeId), prizeSort.length),
      ...prizeSort.slice(0, prizeSort.indexOf(prizeId)),
    ]

    console.log('开始抽奖，后台请求中奖奖品')
    // 请求返回的奖品编号 这里使用随机数 但不能为4
    // const prizeId = getRandomNum()
    // console.log('中奖ID>>>', prizeId, prizeList[prizeId])
    // prizeId = prizeId
    // 模拟接口延时返回 如果接口突然报错如何处理？直接调用stopRun()方法停止转动
    setTimeout(() => {
      uni.hideLoading()
      prizeId = getRandomNum()
      console.log('中奖ID>>>', prizeId, prizeList[prizeId])
      totalRunStep = totalRunCount + prizeSort.indexOf(prizeId)
      console.log('prizeSort', prizeSort, 'totalRunStep', totalRunStep)
      // 拿到数据才可以跑
      startRun()
    }, 500)
  }
}
</script>
<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 90vw;
  height: 90vw;
  margin: 20px auto;
  background: #98d3fc;
  border: 1px solid #98d3fc;
}

.gift-item {
  position: relative;
  box-sizing: border-box;
  width: 30vw;
  height: 30vw;
  border: 2px solid #fff;
}

.gift-item:nth-of-type(5) {
  cursor: pointer;
}

.gift-item .gift-img {
  width: 100%;
  height: 100%;
}

.gift-item .gift-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
  background: rgb(0 0 0 / 50%);
}

.active {
  border: 2px solid red;
  box-shadow: 2px 2px 30px #fff;
}
</style>
