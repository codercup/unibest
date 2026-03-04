/** 支持的平台类型 */
export type Platform = 'mp-weixin' | 'h5' | 'app' | 'mp-alipay' | 'mp-toutiao'

/** 支持的UI库类型 */
export type UILibrary = 'none' | 'wot-ui' | 'sard-uniapp' | 'uview-pro' | 'uv-ui' | 'uview-plus' | 'tdesign'

/** 支持的请求库类型 */
export type RequestLibrary = 'request' | 'alovajs' | 'vue-query'

/** 支持的格式化插件类型 */
export type FormatPlugin = 'oxclint' | 'eslint'

/** 支持的token策略类型 */
export type TokenStrategy = 'double-token' | 'single-token'

/** 支持的图表库类型 */
export type ChartLibrary = 'lime-echart' | 'ucharts'

/** 交互式询问结果 */
export interface PromptResult {
  projectName: string
  platforms: Platform[]
  uiLibrary: UILibrary
  requestLibrary?: RequestLibrary
  i18n: boolean
  loginStrategy: boolean
  chartLibraries: ChartLibrary[]
  tokenStrategy?: TokenStrategy
  formatPlugin?: FormatPlugin
}
