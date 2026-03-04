import { ref } from 'vue'
import { useEcharts } from '../hooks/useEcharts'

// 折线图
export function useLineEcharts(): any {
  // 折线图配置项数据
  // 每次编写新类型的图表时，只需要复制一份修改这里的配置即可
  // 应用 这个类型的图表时，只需在 .vue 文件中通过 set 修复数据即可，或者简单的样式修改，如果样式过于复杂，可以重新建立一个 linkHookB 等等
  const option = ref({
    xAxis: {
      data: [12, 13, 10, 13, 9, 23, 21, 32, 12, 15, 13, 10],
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#0C4787',
        },
      },
      axisLabel: {
        show: true,
        color: '#000000',
      },
    },
    grid: {
      left: 5,
      right: 16,
      bottom: 5,
      top: 20,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      padding: [5, 10],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#0C4787',
        },
      },
      axisLabel: {
        show: true,
        color: '#000000',
      },
    },
    series: {
      smooth: true,
      type: 'line',
      data: [12, 13, 10, 13, 9, 23, 21, 32, 12, 15, 13, 10],
      animationDuration: 2800,
      animationEasing: 'cubicInOut',
      symbol: 'circle',
      color: '#fed42b',
      symbolSize: 8,
      lineStyle: {
        color: '#fed42b', // 改变折线颜色
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#fed42b', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(254, 212, 43, 0.1)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  })
  return useEcharts(option)
}

// 柱状图
export function useBarEcharts(): any {
  const option = ref({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#0C4787',
        },
      },
      axisLabel: {
        show: true,
        color: '#000000',
      },
    },
    grid: {
      left: 5,
      right: 16,
      bottom: 5,
      top: 20,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      padding: [5, 10],
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#0C4787',
        },
      },
      axisLabel: {
        show: true,
        color: '#000000',
      },
    },
    series: {
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
      animationDuration: 2800,
      animationEasing: 'cubicInOut',
      color: '#fed42b',
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [3, 3, 0, 0],
      },
    },
  })
  return useEcharts(option)
}
