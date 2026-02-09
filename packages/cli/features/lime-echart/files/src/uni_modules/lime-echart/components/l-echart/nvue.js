export class Echarts {
	eventMap = new Map()
	constructor(webview) {
		this.webview = webview
		this.options = null
	}
	setOption() {
		this.options = arguments
		this.webview.evalJs(`setOption(${JSON.stringify(arguments)})`);
	}
	getOption() {
		return this.options
	}
	showLoading() {
		this.webview.evalJs(`showLoading(${JSON.stringify(arguments)})`);
	}
	hideLoading() {
		this.webview.evalJs(`hideLoading()`);
	}
	clear() {
		this.webview.evalJs(`clear()`);
	}
	dispose() {
		this.webview.evalJs(`dispose()`);
	}
	resize(size) {
		if(size) {
			this.webview.evalJs(`resize(${JSON.stringify(size)})`);
		} else {
			this.webview.evalJs(`resize()`);
		}
	}
	on(type, ...args) {
		const query = args[0]
		const useQuery = query && typeof query != 'function'
		const param = useQuery ? [type, query] : [type]
		const key = `${type}${useQuery ? JSON.stringify(query): '' }`
		const callback = useQuery ? args[1]: args[0]
		if(typeof callback == 'function'){
			this.eventMap.set(key, callback)
		}
		this.webview.evalJs(`on(${JSON.stringify(param)})`);
		console.warn('nvue 暂不支持事件')
	}
	dispatchAction(type, options){
		const handler = this.eventMap.get(type)
		if(handler){
			handler(options)
		}
	}
}