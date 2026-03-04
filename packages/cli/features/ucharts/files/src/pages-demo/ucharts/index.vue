<template>
  <view class="content">
    <qiun-title-bar title="tooltip提示窗format" />
    <view class="charts-box">
      <qiun-data-charts
        type="column"
        :echarts-h5="true"
        :echarts-app="true"
        :chart-data="chartsDataLine1"
        tooltip-format="tooltipDemo1"
      />
    </view>
    <qiun-title-bar title="图例的format" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echarts-h5="true"
        :echarts-app="true"
        :eopts="{ legend: { format: 'legendFormat' } }"
        :chart-data="chartsDataColumn2"
      />
    </view>
    <qiun-title-bar title="Y轴format方式1" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echarts-h5="true"
        :echarts-app="true"
        :eopts="{ yAxis: { axisLabel: { format: 'yAxisFormatDemo' } } }"
        :chart-data="chartsDataLine1"
      />
    </view>
    <qiun-title-bar title="Y轴format方式2" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echarts-h5="true"
        :echarts-app="true"
        :eopts="{ yAxis: { axisLabel: { formatter: '{value} 元' } } }"
        :chart-data="chartsDataLine1"
      />
    </view>
    <qiun-title-bar title="series数据点format方法1" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echarts-h5="true"
        :echarts-app="true"
        :eopts="{ seriesTemplate: { label: { format: 'seriesFormatDemo' } } }"
        :chart-data="chartsDataLine1"
      />
    </view>
    <qiun-title-bar title="series数据点format方法2" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echarts-h5="true"
        :echarts-app="true"
        :eopts="{ seriesTemplate: { label: { formatter: '{b}年{c}元' } } }"
        :chart-data="chartsDataLine1"
      />
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import demodata from './data.json'

definePage({
  style: { navigationBarTitleText: 'ucharts 图表' },
})

const chartsDataLine1 = ref({})
const chartsDataColumn2 = ref({})

function getServerData() {
  setTimeout(() => {
    chartsDataLine1.value = JSON.parse(JSON.stringify(demodata.Line))
    chartsDataColumn2.value = JSON.parse(JSON.stringify(demodata.Column))
  }, 1500)
}

onMounted(() => {
  getServerData()
})
</script>

<style>
.content {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.charts-box {
  width: 100%;
  height: 300px;
}
</style>
