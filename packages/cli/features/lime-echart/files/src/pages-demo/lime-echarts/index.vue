<template>
  <view class="chart-page">
    <view class="chart-box">
      <l-echart ref="chartRef" @finished="draw" />
    </view>
  </view>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { ref } from 'vue'
import { useEcharts } from '../hooks/useEcharts'

definePage({
  style: { navigationBarTitleText: 'lime-echart 图表' },
})

const options = ref<EChartsOption>({
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
})

const [chartRef, , draw] = useEcharts(options)
</script>

<style>
.chart-page {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.chart-box {
  width: 100%;
  height: 600rpx;
}
</style>
