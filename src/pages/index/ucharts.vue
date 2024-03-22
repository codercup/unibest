<route lang="json5" type="page">
{
  style: { navigationBarTitleText: 'ucharts' },
}
</route>

<template>
  <view class="content">
    <qiun-title-bar title="tooltip提示窗format" />
    <view class="charts-box">
      <!-- 注意：因app端通过组件均不能传递function类型参数，组件内所有formatter方法，均需使用format属性指定config-echarts.js里事先定义好的formatter的key值，组件会自动匹配与其对应的function -->
      <!-- tooltip的format需要在组件的props参数上传递，例如tooltipFormat="tooltipDemo1"，并需要在config-echarts.js中的formatter节点中的tooltipDemo1中配置format方法。如果开启了echarts，则需要在config-echarts.js中的formatter节点中的tooltipDemo1中配置format方法。 -->
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
      <!-- 需要把echarts文档内的formatter转成format，对应的'legendFormat'这个字符串为config-echarts.js中的formatter节点中的 legendFormat 方法-->
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
      <!-- 需要把echarts文档内的formatter转成format，对应的'yAxisFormatDemo'这个字符串为config-echarts.js中的formatter节点中的 yAxisFormatDemo 方法-->
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
      <!-- ECharts如果使用 formatter，则只能使用字符串模板方式，不能使用函数模板！函数模板请参考上面的例子-->
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
      <!-- seriesTemplate是config-echarts.js中对应图表类型定义好的series模板 ，如果每个series的formatter都不一样，则format需要定义在chartData.series中，不能使用seriesTemplate -->
      <!-- formatter需要把echarts文档内的formatter转成format，对应的'seriesFormatDemo'这个字符串为config-echarts.js中的formatter节点中的 seriesFormatDemo 方法-->
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
      <!-- ECharts如果使用 formatter，则只能使用字符串模板方式，不能使用函数模板！函数模板请参考上面的例子-->
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
// 下面是演示数据，您的项目不需要引用，数据需要您从服务器自行获取
import demodata from './demodata.json'

export default {
  data() {
    return {
      chartsDataLine1: {},
      chartsDataColumn2: {},
    }
  },
  onLoad() {
    // 模拟从服务器获取数据
    this.getServerData()
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        // 因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
        // 开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
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
