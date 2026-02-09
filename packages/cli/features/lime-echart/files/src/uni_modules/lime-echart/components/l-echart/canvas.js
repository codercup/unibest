import {getDeviceInfo} from './utils';

const cacheChart = {}
const fontSizeReg = /([\d\.]+)px/;
class EventEmit {
	constructor() {
		this.__events = {};
	}
	on(type, listener) {
		if (!type || !listener) {
			return;
		}
		const events = this.__events[type] || [];
		events.push(listener);
		this.__events[type] = events;
	}
	emit(type, e) {
		if (type.constructor === Object) {
			e = type;
			type = e && e.type;
		}
		if (!type) {
			return;
		}
		const events = this.__events[type];
		if (!events || !events.length) {
			return;
		}
		events.forEach((listener) => {
			listener.call(this, e);
		});
	}
	off(type, listener) {
		const __events = this.__events;
		const events = __events[type];
		if (!events || !events.length) {
			return;
		}
		if (!listener) {
			delete __events[type];
			return;
		}
		for (let i = 0, len = events.length; i < len; i++) {
			if (events[i] === listener) {
				events.splice(i, 1);
				i--;
			}
		}
	}
}
class Image {
	constructor() {
		this.currentSrc = null
		this.naturalHeight = 0
		this.naturalWidth = 0
		this.width = 0
		this.height = 0
		this.tagName = 'IMG'
	}
	set src(src) {
		this.currentSrc = src
		uni.getImageInfo({
			src,
			success: (res) => {
				this.naturalWidth = this.width = res.width
				this.naturalHeight = this.height = res.height
				this.onload()
			},
			fail: () => {
				this.onerror()
			}
		})
	}
	get src() {
		return this.currentSrc
	}
}
class OffscreenCanvas {
	constructor(ctx, com, canvasId) {
		this.tagName = 'canvas'
		this.com = com
		this.canvasId = canvasId
		this.ctx = ctx
	}
	set width(w) {
		this.com.offscreenWidth = w
	}
	set height(h) {
		this.com.offscreenHeight = h
	}
	get width() {
		return this.com.offscreenWidth || 0
	}
	get height() {
		return this.com.offscreenHeight || 0
	}
	getContext(type) {
		return this.ctx
	}
	getImageData() {
		return new Promise((resolve, reject) => {
			this.com.$nextTick(() => {
				uni.canvasGetImageData({
					x:0,
					y:0,
					width: this.com.offscreenWidth,
					height: this.com.offscreenHeight,
					canvasId: this.canvasId,
					success: (res) => {
						resolve(res)
					},
					fail: (err) => {
						reject(err)
					},
				}, this.com)
			})
		})
	}
}
export class Canvas {
	constructor(ctx, com, isNew, canvasNode={}) {
		cacheChart[com.canvasId] = {ctx}
		this.canvasId = com.canvasId;
		this.chart = null;
		this.isNew = isNew
		this.tagName = 'canvas'
		this.canvasNode = canvasNode;
		this.com = com;
		if (!isNew) {
			this._initStyle(ctx)
		}
		this._initEvent();
		this._ee = new EventEmit()
	}
	getContext(type) {
		if (type === '2d') {
			return this.ctx;
		}
	}
	setAttribute(key, value) {
		if(key === 'aria-label') {
			this.com['ariaLabel'] = value
		}
	}
	setChart(chart) {
		this.chart = chart;
	}
	createOffscreenCanvas(param){
		if(!this.children) {
			this.com.isOffscreenCanvas = true
			this.com.offscreenWidth = param.width||300
			this.com.offscreenHeight = param.height||300
			const com = this.com
			const canvasId = this.com.offscreenCanvasId
			const context = uni.createCanvasContext(canvasId, this.com)
			this._initStyle(context)
			this.children = new OffscreenCanvas(context, com, canvasId)
		} 
		return this.children
	}
	appendChild(child) {
		console.log('child', child)
	}
	dispatchEvent(type, e) {
		if(typeof type == 'object') {
			this._ee.emit(type.type, type);
		} else {
			this._ee.emit(type, e);
		}
		return true
	}
	attachEvent() {
	}
	detachEvent() {
	}
	addEventListener(type, listener) {
		this._ee.on(type, listener)
	}
	removeEventListener(type, listener) {
		this._ee.off(type, listener)
	}
	_initCanvas(zrender, ctx) {
		// zrender.util.getContext = function() {
		// 	return ctx;
		// };
		// zrender.util.$override('measureText', function(text, font) {
		// 	ctx.font = font || '12px sans-serif';
		// 	return ctx.measureText(text, font);
		// });
	}
	_initStyle(ctx, child) {
		const styles = [
			'fillStyle',
			'strokeStyle',
			'fontSize',
			'globalAlpha',
			'opacity',
			'textAlign',
			'textBaseline',
			'shadow',
			'lineWidth',
			'lineCap',
			'lineJoin',
			'lineDash',
			'miterLimit',
			// #ifdef H5
			'font',
			// #endif
		];
		const colorReg = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])\b/g;
		styles.forEach(style => {
			Object.defineProperty(ctx, style, {
				set: value => {
					// #ifdef H5
					if (style === 'font' && fontSizeReg.test(value)) {
						const match = fontSizeReg.exec(value);
						ctx.setFontSize(match[1]);
						return;
					}
					// #endif
					
					if (style === 'opacity') {
						ctx.setGlobalAlpha(value)
						return;
					}
					if (style !== 'fillStyle' && style !== 'strokeStyle' || value !== 'none' && value !== null) {
						// #ifdef H5 || APP-PLUS || MP-BAIDU
						if(typeof value == 'object') {
							if (value.hasOwnProperty('colorStop') || value.hasOwnProperty('colors')) {
								ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
							}
							return
						} 
						// #endif
						// #ifdef MP-TOUTIAO
						if(colorReg.test(value)) {
							value = value.replace(colorReg, '#$1$1$2$2$3$3')
						}
						// #endif
						ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
					}
				}
			});
		});
		if(!this.isNew && !child) {
			ctx.uniDrawImage = ctx.drawImage
			ctx.drawImage = (...a) => {
				a[0] = a[0].src
				ctx.uniDrawImage(...a)
			}
		}
		if(!ctx.createRadialGradient) {
			ctx.createRadialGradient = function() {
				return ctx.createCircularGradient(...[...arguments].slice(-3))
			};
		}
		// 字节不支持
		if (!ctx.strokeText) {
			ctx.strokeText = (...a) => {
				ctx.fillText(...a)
			}
		}
		
		// 钉钉不支持 , 鸿蒙是异步
		if (!ctx.measureText || getDeviceInfo().osName == 'harmonyos') {
			ctx._measureText = ctx.measureText
			const strLen = (str) => {
				let len = 0;
				for (let i = 0; i < str.length; i++) {
					if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
						len++;
					} else {
						len += 2;
					}
				}
				return len;
			}
			ctx.measureText = (text, font) => {
				let fontSize = ctx?.state?.fontSize || 12;
				if (font) {
					fontSize = parseInt(font.match(/([\d\.]+)px/)[1])
				}
				fontSize /= 2;
				let isBold = fontSize >= 16;
				const widthFactor = isBold ? 1.3 : 1;
				// ctx._measureText(text, (res) => {})
				return {
					width: strLen(text) * fontSize * widthFactor
				};
			}
		}
	}

	_initEvent(e) {
		this.event = {};
		const eventNames = [{
			wxName: 'touchStart',
			ecName: 'mousedown'
		}, {
			wxName: 'touchMove',
			ecName: 'mousemove'
		}, {
			wxName: 'touchEnd',
			ecName: 'mouseup'
		}, {
			wxName: 'touchEnd',
			ecName: 'click'
		}];

		eventNames.forEach(name => {
			this.event[name.wxName] = e => {
				const touch = e.touches[0];
				this.chart.getZr().handler.dispatch(name.ecName, {
					zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
					zrY: name.wxName === 'tap' ? touch.clientY : touch.y
				});
			};
		});
	}

	set width(w) {
		this.canvasNode.width = w
	}
	set height(h) {
		this.canvasNode.height = h
	}

	get width() {
		return this.canvasNode.width || 0
	}
	get height() {
		return this.canvasNode.height || 0
	}
	get ctx() {
		return cacheChart[this.canvasId]['ctx'] || null
	}
	set chart(chart) {
		cacheChart[this.canvasId]['chart'] = chart
	}
	get chart() {
		return cacheChart[this.canvasId]['chart'] || null
	}
}

export function dispatch(name, {x,y, wheelDelta}) {
	this.dispatch(name, {
		zrX: x,
		zrY: y,
		zrDelta: wheelDelta,
		preventDefault: () => {},
		stopPropagation: () =>{}
	});
}
export function setCanvasCreator(echarts, {canvas, node}) {
	// echarts.setCanvasCreator(() => canvas);
	if(echarts && !echarts.registerPreprocessor) {
		return console.warn('echarts 版本不对或未传入echarts，vue3请使用esm格式')
	}
	echarts.registerPreprocessor(option => {
		if (option && option.series) {
			if (option.series.length > 0) {
				option.series.forEach(series => {
					series.progressive = 0;
				});
			} else if (typeof option.series === 'object') {
				option.series.progressive = 0;
			}
		}
	});
	function loadImage(src, onload, onerror) {
		let img = null
		if(node && node.createImage) {
			img = node.createImage()
			img.onload = onload.bind(img);
			img.onerror = onerror.bind(img);
			img.src = src;
			return img
		} else {
			img = new Image()
			img.onload = onload.bind(img)
			img.onerror = onerror.bind(img);
			img.src = src
			return img
		}
	}
	if(echarts.setPlatformAPI) {
		echarts.setPlatformAPI({
			loadImage: canvas.setChart ? loadImage : null,
			createCanvas(){
				const key = 'createOffscreenCanvas'
				return uni.canIUse(key) && uni[key] ? uni[key]({type: '2d'}) : canvas
			}
		})
	}
}