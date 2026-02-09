<template>
	<view class="lime-echart" :style="[customStyle]" v-if="canvasId" ref="limeEchart" :aria-label="ariaLabel">
		<!-- #ifndef APP-NVUE -->
		<canvas
			class="lime-echart__canvas"
			v-if="use2dCanvas"
			type="2d"
			:id="canvasId"
			:style="canvasStyle"
			:disable-scroll="isDisableScroll"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<canvas
			class="lime-echart__canvas"
			v-else
			:width="nodeWidth"
			:height="nodeHeight"
			:style="canvasStyle"
			:canvas-id="canvasId"
			:id="canvasId"
			:disable-scroll="isDisableScroll"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<view class="lime-echart__mask"
			v-if="isPC"
			@mousedown="touchStart"
			@mousemove="touchMove"
			@mouseup="touchEnd"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd">
		</view>
		<canvas v-if="isOffscreenCanvas" :style="offscreenStyle" :canvas-id="offscreenCanvasId"></canvas>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view
			class="lime-echart__canvas"
			:id="canvasId"
			:style="canvasStyle"
			:webview-styles="webviewStyles"
			ref="webview"
			src="/uni_modules/lime-echart/static/uvue.html?v=1"
			@pagefinish="finished = true"
			@onPostMessage="onMessage"
		></web-view>
		<!-- #endif -->
	</view>
</template>

<script>
// @ts-nocheck
// #ifndef APP-NVUE
import {Canvas, setCanvasCreator, dispatch} from './canvas';
import {wrapTouch, convertTouchesToArray, devicePixelRatio ,sleep, canIUseCanvas2d, getRect, getDeviceInfo} from './utils';
// #endif
// #ifdef APP-NVUE
import { base64ToPath, sleep } from './utils';
import {Echarts} from './nvue'
// #endif
const charts = {}
const echartsObj = {}


/**
 * LimeChart 图表
 * @description 全端兼容的eCharts
 * @tutorial https://ext.dcloud.net.cn/plugin?id=4899

 * @property {String} customStyle 自定义样式
 * @property {String} type 指定 canvas 类型
 * @value 2d 使用canvas 2d，部分小程序支持
 * @value '' 使用原生canvas，会有层级问题
 * @value bottom right	不缩放图片，只显示图片的右下边区域
 * @property {Boolean} isDisableScroll	 
 * @property {number} beforeDelay = [30]  延迟初始化 (毫秒)
 * @property {Boolean} enableHover PC端使用鼠标悬浮

 * @event {Function} finished 加载完成触发
 */
export default {
	name: 'lime-echart',
	props: {
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		type: {
			type: String,
			default: '2d'
		},
		// #endif
		// #ifdef APP-NVUE
		webviewStyles: Object,
		// hybrid: Boolean,
		// #endif
		customStyle: String,
		isDisableScroll: Boolean,
		isClickable: {
			type: Boolean,
			default: true
		},
		enableHover: Boolean,
		beforeDelay: {
			type: Number,
			default: 30
		},
		landscape: Boolean
	},
	data() {
		return {
			// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
			use2dCanvas: false,
			// #endif
			ariaLabel: '图表',
			width: null,
			height: null,
			nodeWidth: null,
			nodeHeight: null,
			// canvasNode: null,
			config: {},
			inited: false,
			finished: false,
			file: '',
			platform: '',
			isPC: false,
			isDown: false,
			isOffscreenCanvas: false,
			offscreenWidth: 0,
			offscreenHeight: 0,
		};
	},
	computed: {
		rootStyle() {
			if(this.landscape) {
				return `transform: translate(-50%,-50%) rotate(90deg); top:50%; left:50%;`
			}
		},
		canvasId() {
			return `lime-echart${this._ && this._.uid || this._uid}`
		},
		offscreenCanvasId() {
			return `${this.canvasId}_offscreen`
		},
		offscreenStyle() {
			return `width:${this.offscreenWidth}px;height: ${this.offscreenHeight}px; position: fixed; left: 99999px; background: red`
		},
		canvasStyle() {
			return this.rootStyle + (this.width && this.height ? ('width:' + this.width + 'px;height:' + this.height + 'px') : '')
		}
	},
	// #ifndef VUE3
	beforeDestroy() {
		this.clear()
		this.dispose()
		// #ifdef H5
		if(this.isPC) {
			document.removeEventListener('mousewheel', this.mousewheel)
		}
		// #endif
	},
	// #endif
	// #ifdef VUE3
	beforeUnmount() {
		this.clear()
		this.dispose()
		// #ifdef H5
		if(this.isPC) {
			document.removeEventListener('mousewheel', this.mousewheel)
		}
		// #endif
	},
	// #endif
	created() {
		// #ifdef H5
		if(!('ontouchstart' in window)) {
			this.isPC = true
			document.addEventListener('mousewheel', this.mousewheel)
		}
		// #endif
		// #ifdef MP-WEIXIN || MP-TOUTIAO || MP-ALIPAY
		// const { platform } = uni.getSystemInfoSync();
		const { platform } = getDeviceInfo();
		this.isPC = /windows/i.test(platform)
		// #endif
		this.use2dCanvas = this.type === '2d' && canIUseCanvas2d()
	},
	mounted() {
		this.$nextTick(() => {
			this.$emit('finished')
		})
	},
	methods: {
		// #ifdef APP-NVUE
		onMessage(e) {
			const detail = e?.detail?.data[0] || null;
			const data = detail?.data
			const key = detail?.event
			const options = data?.options
			const event = data?.event
			const file = detail?.file
			if (key == 'log' && data) {
				console.log(data)
			}
			if(event) {
				this.chart.dispatchAction(event.replace(/"/g,''), options)
			}
			if(file) {
				thie.file = file
			}
		},
		// #endif
		setChart(callback) {
			if(!this.chart) {
				console.warn(`组件还未初始化，请先使用 init`)
				return
			}
			if(typeof callback === 'function' && this.chart) {
				callback(this.chart);
			}
			// #ifdef APP-NVUE
			if(typeof callback === 'function') {
				this.$refs.webview.evalJs(`setChart(${JSON.stringify(callback.toString())}, ${JSON.stringify(this.chart.options)})`);
			}
			// #endif
		},
		setOption() {
			if (!this.chart || !this.chart.setOption) {
				console.warn(`组件还未初始化，请先使用 init`)
				return
			}
			this.chart.setOption(...arguments);
		},
		showLoading() {
			if(this.chart) {
				this.chart.showLoading(...arguments)
			}
		},
		hideLoading() {
			if(this.chart) {
				this.chart.hideLoading()
			}
		},
		clear() {
			if(this.chart) {
				this.chart.clear()
			}
		},
		dispose() {
			if(this.chart) {
				this.chart.dispose()
			}
		},
		resize(size) {
			if(size && size.width && size.height) {
				this.height = size.height
				this.width = size.width
				if(this.chart) {this.chart.resize(size)}
			} else {
				this.$nextTick(() => {
					uni.createSelectorQuery()
						.in(this)
						.select(`.lime-echart`)
						.boundingClientRect()
						.exec(res => {
							if (res) {
								let { width, height } = res[0];
								this.width = width = width || 300;
								this.height = height = height || 300;
								this.chart.resize({width, height})
							}
						});
				})
				
			}
			
		},
		canvasToTempFilePath(args = {}) {
			// #ifndef APP-NVUE
			const { use2dCanvas, canvasId } = this;
			return new Promise((resolve, reject) => {
				const copyArgs = Object.assign({
					canvasId,
					success: resolve,
					fail: reject
				}, args);
				if (use2dCanvas) {
					delete copyArgs.canvasId;
					copyArgs.canvas = this.canvasNode;
				}
				uni.canvasToTempFilePath(copyArgs, this);
			});
			// #endif
			// #ifdef APP-NVUE
			this.file = ''
			this.$refs.webview.evalJs(`canvasToTempFilePath()`);
			return new Promise((resolve, reject) => {
				this.$watch('file', async (file) => {
					if(file) {
						const tempFilePath = await base64ToPath(file)
						resolve(args.success({tempFilePath}))
					} else {
						reject(args.fail({error: ``}))
					}
				})
			})
			// #endif
		},
		async init(echarts, ...args) {
			// #ifndef APP-NVUE
			if(args && args.length == 0 && !echarts) {
				console.error('缺少参数：init(echarts, theme?:string, opts?: object, callback?: function)')
				return
			}
			// #endif
			let theme=null,opts={},callback;
			
			Array.from(arguments).forEach(item => {
				if(typeof item === 'function') {
					callback = item
				}
				if(['string'].includes(typeof item)) {
					theme = item
				}
				if(typeof item === 'object') {
					opts = item
				}
			})
			
			if(this.beforeDelay) {
				await sleep(this.beforeDelay)
			}
			let config = await this.getContext();
			// #ifndef APP-NVUE
			setCanvasCreator(echarts, config)
			try {
				this.chart = echarts.init(config.canvas, theme, Object.assign({}, config, opts))
				if(typeof callback === 'function') {
					callback(this.chart)
				} else {
					return this.chart
				}
			} catch(e) {
				console.error(e.messges)
				return null
			}
			// #endif
			// #ifdef APP-NVUE
			this.chart = new Echarts(this.$refs.webview)
			this.$refs.webview.evalJs(`init(null, null, ${JSON.stringify(opts)}, ${theme})`)
			if(callback) {
				callback(this.chart)
			} else {
				return this.chart
			}
			// #endif
		},
		getContext() {
			// #ifdef APP-NVUE
			if(this.finished) {
				return Promise.resolve(this.finished)
			}
			return new Promise(resolve => {
				this.$watch('finished', (val) => {
					if(val) {
						resolve(this.finished)
					}
				})
			})
			// #endif
			// #ifndef APP-NVUE
			return getRect(`#${this.canvasId}`, {context: this, type: this.use2dCanvas ? 'fields': 'boundingClientRect'}).then(res => {
				if(res) {
					let dpr = devicePixelRatio
					let {width, height, node} = res
					let canvas;
					this.width = width = width || 300;
					this.height = height = height || 300;
					if(node) {
						const ctx = node.getContext('2d');
						canvas = new Canvas(ctx, this, true, node);
						this.canvasNode = node
					} else {
						// #ifdef MP-TOUTIAO
						dpr = !this.isPC ? devicePixelRatio : 1// 1.25
						// #endif
						// #ifndef MP-ALIPAY || MP-TOUTIAO
						dpr = this.isPC ? devicePixelRatio : 1
						// #endif
						// #ifdef MP-ALIPAY || MP-LARK
						dpr = devicePixelRatio
						// #endif
						// #ifdef WEB
						dpr = 1
						// #endif
						this.rect = res
						this.nodeWidth = width * dpr;
						this.nodeHeight = height * dpr;
						const ctx = uni.createCanvasContext(this.canvasId, this);
						canvas =  new Canvas(ctx, this, false);
					}
					
					return { canvas, width, height, devicePixelRatio: dpr, node };
				} else {
					return {}
				}
			})
			// #endif
		},
		// #ifndef APP-NVUE
		getRelative(e, touches) {
			let { clientX, clientY } = e
			if(!(clientX && clientY) && touches && touches[0]) {
				clientX = touches[0].clientX
				clientY = touches[0].clientY
			}
			return {x: clientX - this.rect.left, y: clientY - this.rect.top, wheelDelta: e.wheelDelta || 0}
		},
		getTouch(e, touches) {
			const {x} = touches && touches[0] || {}
			const touch = x ? touches[0] : this.getRelative(e, touches);
			if(this.landscape) {
				[touch.x, touch.y] = [touch.y, this.height - touch.x]
			}
			return touch;
		},
		touchStart(e) {
			this.isDown = true
			const next = () => {
				const touches = convertTouchesToArray(e.touches)
				if(this.chart) {
					const touch = this.getTouch(e, touches)
					this.startX = touch.x
					this.startY = touch.y
					this.startT = new Date()
					const handler = this.chart.getZr().handler;
					dispatch.call(handler, 'mousedown', touch)
					dispatch.call(handler, 'mousemove', touch)
					handler.processGesture(wrapTouch(e), 'start');
					clearTimeout(this.endTimer);
				}
				
			}
			if(this.isPC) {
				getRect(`#${this.canvasId}`, {context: this}).then(res => {
					this.rect = res
					next()
				})
				return
			}
			next()
		},
		touchMove(e) {
			if(this.isPC && this.enableHover && !this.isDown) {this.isDown = true}
			const touches = convertTouchesToArray(e.touches)
			if (this.chart && this.isDown) {
				const handler = this.chart.getZr().handler;
				dispatch.call(handler, 'mousemove', this.getTouch(e, touches))
				handler.processGesture(wrapTouch(e), 'change');
			}
			
		},
		touchEnd(e) {
			this.isDown = false
			if (this.chart) {
				const touches = convertTouchesToArray(e.changedTouches)
				const {x} = touches && touches[0] || {}
				const touch = (x ? touches[0] : this.getRelative(e, touches)) || {};
				if(this.landscape) {
					[touch.x, touch.y] = [touch.y,  this.height - touch.x]
				}
				const handler = this.chart.getZr().handler;
				const isClick = Math.abs(touch.x - this.startX) < 10 && new Date() - this.startT < 200;
				dispatch.call(handler, 'mouseup', touch)
				handler.processGesture(wrapTouch(e), 'end');
				if(isClick) {
					dispatch.call(handler, 'click', touch)
				} else {
					this.endTimer = setTimeout(() => {
						dispatch.call(handler, 'mousemove', {x: 999999999,y: 999999999});
						dispatch.call(handler, 'mouseup', {x: 999999999,y: 999999999});
					},50)
				}
			}
		},
		// #endif
		// #ifdef H5
		mousewheel(e){
			if(this.chart) {
				// dispatch.call(this.chart.getZr().handler, 'mousewheel', this.getTouch(e))
			}
		}
		// #endif
	}
};
</script>
<style>	
.lime-echart {
	position: relative;
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
}
.lime-echart__canvas {
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
}
/* #ifndef APP-NVUE */
.lime-echart__mask {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 1;
}
/* #endif */
</style>
