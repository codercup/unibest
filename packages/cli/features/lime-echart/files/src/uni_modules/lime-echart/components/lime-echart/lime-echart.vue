<template>
  <view>
    <view style="height: 750rpx; position: relative">
      <l-echart ref="chart" @finished="init"></l-echart>
      <view
        class="customTooltips"
        :style="{ left: position[0] + 'px', top: position[1] + 'px' }"
        v-if="params.length && position.length && showTip"
      >
        <view>这是个自定的tooltips</view>
        <view>{{ params[0]['axisValue'] }}</view>
        <view v-for="item in params">
          <view>
            <text>{{ item.seriesName }}</text>
            <text>{{ item.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// nvue 不需要引入
// #ifdef VUE2
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
// #endif
// #ifdef VUE3
// #ifdef MP
// 由于vue3 使用vite 不支持umd格式的包，小程序依然可以使用，但需要使用require
const echarts = require('../../static/echarts.min')
// #endif
// #ifndef MP
// 由于 vue3 使用vite 不支持umd格式的包，故引入npm的包
import * as echarts from 'echarts/dist/echarts.esm'
// #endif
// #endif
export default {
  data() {
    return {
      showTip: false,
      position: [],
      params: [],
      option: {
        tooltip: {
          trigger: 'axis',
          // shadowBlur: 0,
          textStyle: {
            textShadowBlur: 0,
          },
          renderMode: 'richText',
          position: (point, params, dom, rect, size) => {
            // 假设自定义的tooltips尺寸
            const box = [170, 170]
            // 偏移
            const offsetX = point[0] < size.viewSize[0] / 2 ? 20 : -box[0] - 20
            const offsetY = point[1] < size.viewSize[1] / 2 ? 20 : -box[1] - 20
            const x = point[0] + offsetX
            const y = point[1] + offsetY

            this.position = [x, y]
            this.params = params
          },
          formatter: (params, ticket, callback) => {},
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
      },
    }
  },

  methods: {
    init() {
      // init(echarts, theme?:string, opts?:{}, chart => {})
      // echarts 必填， 非nvue必填，nvue不用填
      // theme 可选，应用的主题，目前只支持名称，如：'dark'
      // opts = { // 可选
      //	locale?: string  // 从 `5.0.0` 开始支持
      // }
      // chart => {} ， callback 返回图表实例
      // setTimeout(()=>{
      // 	this.$refs.chart.init(echarts, chart => {
      // 		chart.setOption(this.option);
      // 	});
      // },300)
      this.$refs.chart.init(echarts, (chart) => {
        chart.setOption(this.option)

        // 监听tooltip显示事件
        chart.on('showTip', (params) => {
          this.showTip = true
          console.log('showTip::')
        })
        chart.on('hideTip', (params) => {
          setTimeout(() => {
            this.showTip = false
          }, 300)
        })

        setTimeout(() => {
          const option = {
            tooltip: {
              trigger: 'axis',
              // shadowBlur: 0,
              textStyle: {
                textShadowBlur: 0,
              },
              renderMode: 'richText',
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
                data: [1120, 132, 101, 134, 90, 230, 210],
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
                data: [150, 632, 201, 154, 190, 330, 410],
              },
              {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [820, 332, 301, 334, 390, 330, 320],
              },
              {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
              },
            ],
          }
          chart.setOption(option)
        }, 1000)
      })
    },
    save() {
      this.$refs.chart.canvasToTempFilePath({
        success(res) {
          console.log('res::::', res)
        },
      })
    },
  },
}
</script>
<style>
.customTooltips {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20rpx;
}
</style>
