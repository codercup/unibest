<route lang="json5" type="page">
{
  style: { navigationBarTitleText: 'ucharts 图表' },
}
</route>

<template>
  <view class="content">
    <qiun-title-bar title="tooltip提示窗format" />
    <view class="charts-box">
      <qiun-data-charts
        type="column"
        :echartsH5="true"
        :echartsApp="true"
        :chartData="chartsDataLine1"
        tooltipFormat="tooltipDemo1"
      />
    </view>
    <qiun-title-bar title="图例的format" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ legend: { format: 'legendFormat' } }"
        :chartData="chartsDataColumn2"
      />
    </view>
    <qiun-title-bar title="Y轴format方式1" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ yAxis: { axisLabel: { format: 'yAxisFormatDemo' } } }"
        :chartData="chartsDataLine1"
      />
    </view>
    <qiun-title-bar title="Y轴format方式2" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ yAxis: { axisLabel: { formatter: '{value} 元' } } }"
        :chartData="chartsDataLine1"
      />
    </view>
    <qiun-title-bar title="series数据点format方法1" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ seriesTemplate: { label: { format: 'seriesFormatDemo' } } }"
        :chartData="chartsDataLine1"
      />
    </view>
    <qiun-title-bar title="series数据点format方法2" />
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :echartsH5="true"
        :echartsApp="true"
        :eopts="{ seriesTemplate: { label: { formatter: '{b}年{c}元' } } }"
        :chartData="chartsDataLine1"
      />
    </view>
  </view>
</template>

<script>
import demodata from './ucharts/data.json'

export default {
  data() {
    return {
      chartsDataLine1: {},
      chartsDataColumn2: {},
    }
  },
  onLoad() {
    this.getServerData()
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        this.chartsDataLine1 = JSON.parse(JSON.stringify(demodata.Line))
        this.chartsDataColumn2 = JSON.parse(JSON.stringify(demodata.Column))
      }, 1500)
    },
  },
}
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
