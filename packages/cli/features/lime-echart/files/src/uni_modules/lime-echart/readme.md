# echarts 图表 <span style="font-size:16px;">👑👑👑👑👑 <span style="background:#ff9d00;padding:2px 4px;color:#fff;font-size:10px;border-radius: 3px;">全端</span></span>
> 一个基于 JavaScript 的开源可视化图表库   [查看更多](https://limeui.qcoon.cn/#/echart) <br>
> 基于 echarts 做了兼容处理，更多示例请访问  [uni示例](https://limeui.qcoon.cn/#/echart-example) | [官方示例](https://echarts.apache.org/examples/zh/index.html)  <br>


## 平台兼容

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 | App  |
| --- | ---------- | ------------ | ---------- | ---------- | --------- | ---- |
| √   | √          | √         | √      | √       | √      | √ |


## 安装
- 第一步：在市场导入 [百度图表](https://ext.dcloud.net.cn/plugin?id=4899) 
- 第二步：选择插件依赖：<br>
  1、可以选插件内的`echarts`包或自定义包，自定义包[下载地址](https://echarts.apache.org/zh/builder.html)<br>
  2、或者使用`npm`安装`echarts`	

**注意** 
* 🔔 echarts 5.3.0及以上
* 🔔 如果是 `cli` 项目请下载插件到`src`目录下的`uni_modules`,没有这个目录就创建一个


## 代码演示

### Vue2
- 引入依赖，可以是插件内提供或自己下载的[自定义包](https://echarts.apache.org/zh/builder.html)，也可以是`npm`包

```html
<view style="width:750rpx; height:750rpx"><l-echart ref="chartRef" @finished="init"></l-echart></view>
```

```js
// 插件内的 三选一
import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
// 自定义的 三选一 下载后放入项目的路径
import * as echarts from 'xxx/echarts.min'
// npm包 三选一 需要在控制台 输入命令：npm install echarts
import * as echarts from 'echarts'
```

```js
export default {
	data() {
		return {
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow' 
					},
					confine: true
				},
				legend: {
					data: ['热度', '正面', '负面']
				},
				grid: {
					left: 20,
					right: 20,
					bottom: 15,
					top: 40,
					containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}
				],
				yAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
						axisLine: {
							lineStyle: {
								color: '#999999'
							}
						},
						axisLabel: {
							color: '#666666'
						}
					}
				],
				series: [
					{
						name: '热度',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: [300, 270, 340, 344, 300, 320, 310],
					},
					{
						name: '正面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true
							}
						},
						data: [120, 102, 141, 174, 190, 250, 220]
					},
					{
						name: '负面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'left'
							}
						},
						data: [-20, -32, -21, -34, -90, -130, -110]
					}
				]
			},
		};
	},
	// 组件能被调用必须是组件的节点已经被渲染到页面上
	methods: {
		async init() {
			// chart 图表实例不能存在data里
			const chart = await this.$refs.chartRef.init(echarts);
			chart.setOption(this.option)
		}
	}
}
```

### Vue3
- 小程序可以使用`require`引入插件内提供或自己下载的[自定义包](https://echarts.apache.org/zh/builder.html)
- `require`仅支持相对路径,不支持路径别名
- 非小程序使用 `npm` 包


```html
<view style="width:750rpx; height:750rpx"><l-echart ref="chartRef"></l-echart></view>
```

```js
// 小程序 二选一 
// 插件内的 二选一 
const echarts = require('../../uni_modules/lime-echart/static/echarts.min');
// 自定义的 二选一 下载后放入项目的路径
const echarts = require('xxx/xxx/echarts');

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 非小程序 
// 需要在控制台 输入命令：npm install echarts
import * as echarts from 'echarts'
```

```js

const chartRef = ref(null)
const option = {
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow' 
		},
		confine: true
	},
	legend: {
		data: ['热度', '正面', '负面']
	},
	grid: {
		left: 20,
		right: 20,
		bottom: 15,
		top: 40,
		containLabel: true
	},
	xAxis: [
		{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#999999'
				}
			},
			axisLabel: {
				color: '#666666'
			}
		}
	],
	yAxis: [
		{
			type: 'category',
			axisTick: { show: false },
			data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
			axisLine: {
				lineStyle: {
					color: '#999999'
				}
			},
			axisLabel: {
				color: '#666666'
			}
		}
	],
	series: [
		{
			name: '热度',
			type: 'bar',
			label: {
				normal: {
					show: true,
					position: 'inside'
				}
			},
			data: [300, 270, 340, 344, 300, 320, 310],
		},
		{
			name: '正面',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: true
				}
			},
			data: [120, 102, 141, 174, 190, 250, 220]
		},
		{
			name: '负面',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'left'
				}
			},
			data: [-20, -32, -21, -34, -90, -130, -110]
		}
	]
};


onMounted( ()=>{
	// 组件能被调用必须是组件的节点已经被渲染到页面上
	setTimeout(async()=>{
		if(!chartRef.value) return
		const myChart = await chartRef.value.init(echarts)
		myChart.setOption(option)
	},300)
})

```


### Uvue
- Uvue和Nvue不需要引入`echarts`，因为它们的实现方式是`webview`
- uniapp x需要HBX 4.13以上

```html
<view style="width: 100%; height: 408px;">
	<l-echart ref="chartRef" @finished="init"></l-echart>
</view>
```

```js
// @ts-nocheck
// #ifdef H5
import * as echarts from 'echarts/dist/echarts.esm.js'
// #endif
const chartRef = ref<LEchartComponentPublicInstance|null>(null);
const init = async () => {
	if(chartRef.value== null) return
	// #ifdef APP
	const chart = await chartRef.value!.init(null)
	// #endif
	// #ifdef H5
	const chart = await chartRef.value!.init(echarts, null)
	// #endif
	chart.setOption(option)
}
```


## 数据更新
- 1、使用 `ref` 可获取`setOption`设置更新
- 2、也可以拿到图表实例`chart`设置`myChart.setOption(data)`

```js
// ref
this.$refs.chart.setOption(data)

// 图表实例
myChart.setOption(data)
```

## 图表大小
- 在有些场景下，我们希望当容器大小改变时，图表的大小也相应地改变。

```js
// 默认获取容器尺寸
this.$refs.chart.resize()
// 指定尺寸
this.$refs.chart.resize({width: 375, height: 375})
```

## 自定义Tooltips
- uvue\nvue 不支持
由于除H5之外都不存在dom，但又有tooltips个性化的需求，代码就不贴了，看示例吧
```
代码位于/uni_modules/lime-echart/component/lime-echart
```


## 插件标签
- 默认 l-echart 为 component
- 默认 lime-echart 为 demo
```html
 // 在任意地方使用可查看domo, 代码位于/uni_modules/lime-echart/component/lime-echart
<lime-echart></lime-echart>
```


## 常见问题
- 钉钉小程序 由于没有`measureText`,模拟的`measureText`又无法得到当前字体的`fontWeight`,故可能存在估计不精细的问题
- 微信小程序 `2d` 只支持 真机调试2.0
- 微信开发工具会出现 `canvas` 不跟随页面的情况，真机不影响
- 微信开发工具会出现 `canvas` 层级过高的问题，真机一般不受影响，可以先测只有两个元素的页面看是否会有层级问题。
- toolbox 不支持 `saveImage`
- echarts 5.3.0 的 lines 不支持 trailLength，故需设置为 `0`
- dataZoom H5不要设置 `showDetail` 
- 如果微信小程序的`tooltip`文字有阴影，可能是微信的锅，临时解决方法是`tooltip.shadowBlur = 0`
- 如果钉钉小程序上传时报安全问题`Uint8Clamped`,可以向钉钉反馈是安全代码扫描把Uint8Clamped数组错误识别了，也可以在 echarts 文件修改`Uint8Clamped`
```js
// 找到这段代码把代码中`Uint8Clamped`改成`Uint8_Clamped`，再把下划线去掉，不过直接去掉`Uint8Clamped`也是可行的
// ["Int8","Uint8","Uint8Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64"],(function(t,e){return t["[object "+e+"Array]"]
// 改成如下
["Int8","Uint8","Uint8_Clamped","Int16","Uint16","Int32","Uint32","Float32","Float64"],(function(t,e){return t["[object "+e.replace('_','')+"Array]"]
```

### vue3
如果您是使用 **vite + vue3** 非微信小程序可能会遇到`echarts`文件缺少`wx`判断导致无法使用或缺少`tooltip`<br>

方式一：可以在`echarts.min.js`文件开头增加以下内容，参考插件内的echart.min.js的做法

```js
let global = null
let wx = uni
```

方式二：在`vite.config.js`的`define`设置环境

```js
//  或者在`vite.config.js`的`define`设置环境
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

const define = {}
if(!["mp-weixin", "h5", "web"].includes(process.env.UNI_PLATFORM)) {
	define['global'] =  null
	define['wx'] =  'uni'
}
export default defineConfig({
	plugins: [uni()],
	define
});
```


## Props

| 参数             | 说明                                                            | 类型             | 默认值        | 版本 	|
| ---------------  | --------                                                        | -------         | ------------ | ----- 	|
| custom-style     | 自定义样式                                                      |   `string`       | -            | -     	|
| type             | 指定 canvas 类型                                				 |    `string`      | `2d`         |   	    |
| is-disable-scroll | 触摸图表时是否禁止页面滚动                                       |    `boolean`     | `false`     |   	    |
| beforeDelay       |  延迟初始化 (毫秒)                       						|    `number`     | `30`     |   	    |
| enableHover       |  PC端使用鼠标悬浮                       						|    `boolean`     | `false`     |   	    |
| landscape       |  是否旋转90deg,模拟横屏效果                       						|    `boolean`     | `false`     |   	    |

## 事件

| 参数                    | 说明                                                                                                             |
| ---------------        | ---------------                                                                                                  |
| init(echarts, chart => {})  | 初始化调用函数,第一个参数是传入`echarts`,第二个参数是回调函数，回调函数的参数是 `chart` 实例                                           |  
| setChart(chart => {})        | 已经初始化后，请使用这个方法，是个回调函数，参数是 `chart` 实例                  |  
| setOption(data)        | [图表配置项](https://echarts.apache.org/zh/option.html#title)，用于更新 ，传递是数据 `option`  |  
| clear()                | 清空当前实例，会移除实例中所有的组件和图表。  |  
| dispose()              | 销毁实例  |  
| showLoading()          | 显示加载  |  
| hideLoading()          | 隐藏加载  |  
| [canvasToTempFilePath](https://uniapp.dcloud.io/api/canvas/canvasToTempFilePath.html#canvastotempfilepath)(opt)  | 用于生成图片,与官方使用方法一致，但不需要传`canvasId`  |  


## 打赏
如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/alipay.png)
![](https://testingcf.jsdelivr.net/gh/liangei/image@1.9/wpay.png)