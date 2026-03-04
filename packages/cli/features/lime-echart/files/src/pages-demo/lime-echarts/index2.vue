<template>
  <view>折线图1</view>
  <view style="width: 100%; height: 200px">
    <l-echart ref="lineChartRef" />
  </view>
  <view>折线图2</view>
  <view style="width: 100%; height: 200px">
    <l-echart ref="lineChartRef2" />
  </view>
  <view>柱状图</view>
  <view style="width: 100%; height: 200px">
    <l-echart ref="barChartRef" />
  </view>
  <button @click="changeLineChartData">
    切换折线图1数据
  </button>
  <button @click="changeBarChartData">
    改变柱状图样式
  </button>
</template>

<script setup lang="ts">
import { set } from 'lodash-es'
import { onMounted } from 'vue'
import { useBarEcharts, useLineEcharts } from './index2'

definePage({
  style: { navigationBarTitleText: 'lime-echart 图表2' },
})

const [lineChartRef, lineOption, lineDraw] = useLineEcharts()
const [lineChartRef2, lineOption2, lineDraw2] = useLineEcharts()
const [barChartRef, barOption, barDraw] = useBarEcharts()

// 初始化 折线图表1
function initLineChart() {
  set(
    lineOption.value,
    'series.data',
    [120, 132, 101, 134, 90, 230, 210, 220, 182, 191, 234, 290],
  )
  lineDraw()
}

// 初始化 折线图表2
function initLineChart2() {
  set(
    lineOption2.value,
    'series.data',
    [220, 182, 191, 234, 290, 330, 310, 320, 302, 301, 334, 390],
  )
  lineDraw2()
}

// 初始化 柱状图表
function initBarChart() {
  set(barOption.value, 'series.data', [120, 200, 150, 80, 70, 110, 130])
  barDraw()
}

// 切换折线图数据
function changeLineChartData() {
  set(
    lineOption.value,
    'series.data',
    [324, 332, 301, 334, 390, 330, 320, 302, 301, 334, 390, 330],
  )
  lineDraw()
}

// 改变柱状图样式
function changeBarChartData() {
  set(barOption.value, 'series.color', '#5677fc')
  barDraw()
}

onMounted(() => {
  initLineChart()
  initLineChart2()
  initBarChart()
})
</script>

<style>
/* 暗黑模式 start */
.wot-theme-dark {
  color: #f5f5f5;
  background: #222;
  --theme-bg-color: #222;
}
</style>
