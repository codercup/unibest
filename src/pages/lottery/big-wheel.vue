<route lang="json5">
{
  style: { navigationBarTitleText: '大转盘抽奖' },
}
</route>
<template>
  <view>
    <view class="container">
      <view class="prize-list" :style="styleObj">
        <view
          class="prize-item"
          v-for="(item, index) in prizeList"
          :key="item.id"
          :style="prizeStyle(index)"
        >
          <image :src="item.pic" class="gift-img" />
          <text class="gift-name">{{ item.name }}</text>
        </view>
      </view>
      <view class="lottery-btn" @click="start"> </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

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
    id: 4,
    name: '可爱脸',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/tushetou.jpg',
  },
  {
    id: 5,
    name: '挖掘机',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/wajueji.jpg',
  },
  {
    id: 6,
    name: '无辜脸',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/xiaolian.jpg',
  },
  {
    id: 7,
    name: '烟灰缸',
    pic: 'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/yanhuigang.jpg',
  },
]
let isRunning = false // 是否正在抽奖
const baseRunAngle = 360 * 5 // 总共转动角度 至少5圈
let prizeId = 0 // 中奖id

// 平均每个奖品角度
const rotateAngle = computed(() => {
  const _degree = 360 / prizeList.length
  return _degree
})

// 要执行总角度数
const totalRunAngle = computed(() => {
  return baseRunAngle + 360 - prizeId * rotateAngle.value - rotateAngle.value / 2
})

// 计算绘制转盘背景
const bgColor = (() => {
  const _len = prizeList.length
  const colorList = ['#5352b3', '#363589']
  let colorVal = ''
  for (let i = 0; i < _len; i++) {
    colorVal += `${colorList[i % 2]} ${rotateAngle.value * i}deg ${rotateAngle.value * (i + 1)}deg,`
  }
  return `background: conic-gradient(${colorVal.slice(0, -1)});`
})()

const styleObj = ref(bgColor)
// 每个奖品布局
const prizeStyle = computed(() => {
  const _degree = rotateAngle.value
  return (i) => {
    // 外框大小设置为90vw，里面是一半，45vw
    return `
              width: ${2 * 45 * Math.sin(((_degree / 2) * Math.PI) / 180)}vw;
              height: 45vw;
              transform: rotate(${_degree * i + _degree / 2}deg);
              transform-origin: 50% 100%;
            `
  }
})

// 获取随机数
const getRandomNum = () => {
  const num = Math.floor(Math.random() * prizeList.length)
  return num
}

const stopRun = () => {
  isRunning = false
  styleObj.value = `${bgColor} transform: rotate(${totalRunAngle.value - baseRunAngle}deg);`
}

const startRun = () => {
  console.log(isRunning, totalRunAngle.value)
  // 设置动效
  styleObj.value = `${bgColor} transform: rotate(${totalRunAngle.value}deg); transition: all 4s ease;`
  setTimeout(stopRun, 4000)
}
const start = () => {
  if (!isRunning) {
    isRunning = true

    console.log('开始抽奖，后台请求中奖奖品')
    setTimeout(() => {
      // 请求返回的奖品编号 这里使用随机数
      prizeId = getRandomNum()
      console.log('中奖ID>>>', prizeId, prizeList[prizeId])
    }, 2000)
    startRun()
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  width: 90vw;
  height: 90vw;
  margin: 20px auto;
}

.prize-list {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;

  // 使用outline代替border可以省很多定位的问题
  outline: 10px solid #98d3fc;
}

.prize-item {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  margin: auto;

  // border: 2px solid red;
}

.prize-item .gift-img {
  display: block;
  width: 30%;
  height: 20%;
  margin: 20px auto 10px;
  border-radius: 50%;
}

.prize-item .gift-name {
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  text-align: center;
}

.lottery-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  margin: auto;
  cursor: pointer;
  background: url('https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/lottery-prize/btn-enable.png')
    no-repeat center / 100% 100%;
  transform: translate(-50%, -50%);
}
</style>
