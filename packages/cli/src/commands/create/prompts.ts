import type { ChartLibrary, Platform, PromptResult, UILibrary } from '../../types'
import process from 'node:process'
import { cancel, confirm, isCancel, multiselect, select, text } from '@clack/prompts'
import { green, red } from 'kolorist'
import { logger } from '../../utils/logger'
import { checkProjectNameExistAndValidate } from '../../utils/validate'

// 定义常量以便复用和校验
const VALID_PLATFORMS = ['h5', 'mp-weixin', 'app', 'mp-alipay', 'mp-toutiao']
const VALID_UI_LIBRARIES = ['none', 'wot-ui', 'uview-pro', 'sard-uniapp', 'uv-ui', 'uview-plus']
const VALID_CHART_LIBRARIES = ['lime-echart', 'ucharts']

/**
 * 交互式询问用户项目配置
 * @param projectName - 命令行提供的项目名称（可选）
 * @param argv - 命令行参数
 * @returns 用户选择的项目配置
 */
export async function promptUser(projectName?: string, argv: Record<string, any> = {}): Promise<PromptResult> {
  // 解析命令行参数
  let platforms: Platform[] | undefined
  let uiLibrary: UILibrary | undefined
  let loginStrategy: boolean | undefined
  let i18n: boolean | undefined
  let chartLibraries: ChartLibrary[] | undefined

  // 1. 解析 Platform
  const platformArg = argv.p || argv.platform
  if (platformArg) {
    let parsedPlatforms: string[] = []
    if (Array.isArray(platformArg)) {
      // -p h5 -p mp-weixin
      parsedPlatforms = platformArg
    }
    else if (typeof platformArg === 'string') {
      // -p h5,mp-weixin
      parsedPlatforms = platformArg.split(',')
    }

    // 校验
    const invalidPlatforms = parsedPlatforms.filter(p => !VALID_PLATFORMS.includes(p))
    if (invalidPlatforms.length > 0) {
      console.error(red(`无效的平台参数: ${invalidPlatforms.join(', ')}`))
      console.error(red(`可选值: ${VALID_PLATFORMS.join(', ')}`))
      process.exit(1)
    }
    platforms = parsedPlatforms as Platform[]
  }

  // 2. 解析 UI Library
  const uiArg = argv.u || argv.ui
  if (uiArg) {
    if (!VALID_UI_LIBRARIES.includes(uiArg)) {
      console.error(red(`无效的UI库参数: ${uiArg}`))
      console.error(red(`可选值: ${VALID_UI_LIBRARIES.join(', ')}`))
      process.exit(1)
    }
    uiLibrary = uiArg as UILibrary
  }

  // 3. 解析 Login Strategy
  const loginArg = argv.l ?? argv.login
  if (loginArg === true || loginArg === 'true') {
    loginStrategy = true
  }
  else if (loginArg === false || loginArg === 'false') {
    loginStrategy = false
  }

  // 4. 解析 i18n
  const i18nArg = argv.i ?? argv.i18n
  if (i18nArg === true || i18nArg === 'true') {
    i18n = true
  }
  else if (i18nArg === false || i18nArg === 'false') {
    i18n = false
  }

  // 5. 解析图表库
  const chartArgs: ChartLibrary[] = []
  if (argv['lime-echart'] === true || argv['lime-echart'] === 'true') {
    chartArgs.push('lime-echart')
  }
  if (argv.ucharts === true || argv.ucharts === 'true' || argv.uchart === true || argv.uchart === 'true') {
    chartArgs.push('ucharts')
  }
  if (chartArgs.length > 0) {
    const invalidCharts = chartArgs.filter(c => !VALID_CHART_LIBRARIES.includes(c))
    if (invalidCharts.length > 0) {
      console.error(red(`无效的图表库参数: ${invalidCharts.join(', ')}`))
      console.error(red(`可选值: ${VALID_CHART_LIBRARIES.join(', ')}`))
      process.exit(1)
    }
    chartLibraries = Array.from(new Set(chartArgs))
  }

  try {
    // 1. 项目名称（如果未通过命令行提供）
    if (!projectName) {
      const inputProjectName = await text({
        message: `请输入项目名称${green('[项目名称只能包含字母、数字、下划线和短横线，千万别写中文]')}`,
        initialValue: '',
        validate: (value) => {
          if (!value?.trim())
            return '项目名称不能为空'
          const errorMessage = checkProjectNameExistAndValidate(value)
          if (errorMessage)
            return errorMessage
          return
        },
      })

      // 处理用户取消操作
      if (isCancel(inputProjectName)) {
        cancel('操作已取消')
        process.exit(0)
      }

      projectName = inputProjectName
    }

    // 2. 选择平台（多选）
    if (!platforms) {
      const selectedPlatforms = await multiselect({
        message: `请选择需要支持的平台（多选）${green('[脚手架将根据所选平台生成对应的平台代码，请根据实际情况选择]')}`,
        options: [
          { value: 'h5', label: 'H5' },
          { value: 'mp-weixin', label: '微信小程序' },
          { value: 'app', label: 'APP' },
          { value: 'mp-alipay', label: '支付宝小程序（包含钉钉）' },
          { value: 'mp-toutiao', label: '抖音小程序' },
        ],
        initialValues: ['h5'], // 默认选择 H5
        required: true,
      })

      // 处理用户取消操作
      if (isCancel(selectedPlatforms)) {
        cancel('操作已取消')
        process.exit(0)
      }
      platforms = selectedPlatforms as Platform[]
    }

    // 3. 选择UI库（单选）
    if (!uiLibrary) {
      const selectedUiLibrary = await select({
        message: '请选择UI库',
        options: [
          { value: 'none', label: '无UI库' },
          { value: 'wot-ui', label: 'wot-ui' },
          { value: 'uview-pro', label: 'uview-pro' },
          { value: 'sard-uniapp', label: 'sard-uniapp' },
          { value: 'uv-ui', label: 'uv-ui' },
          { value: 'uview-plus', label: 'uview-plus' },
          { value: 'tdesign', label: 'tdesign' },
        ],
        initialValue: 'none',
      })

      // 处理用户取消操作
      if (isCancel(selectedUiLibrary)) {
        cancel('操作已取消')
        process.exit(0)
      }
      uiLibrary = selectedUiLibrary as UILibrary
    }

    // 4. 是否需要”登录策略“
    if (loginStrategy === undefined) {
      const selectedLoginStrategy = await confirm({
        message: `是否需要登录策略（黑白名单、登录拦截等）？${green('[暂不知道的，选No即可，项目生成后也可以加该策略]')}`,
        initialValue: false,
      })

      // 处理用户取消操作
      if (isCancel(selectedLoginStrategy)) {
        cancel('操作已取消')
        process.exit(0)
      }
      loginStrategy = selectedLoginStrategy as boolean
    }

    // 5. 是否启用多语言（确认）
    if (i18n === undefined) {
      const selectedI18n = await confirm({
        message: '是否需要多语言i18n？',
        initialValue: false,
      })

      // 处理用户取消操作
      if (isCancel(selectedI18n)) {
        cancel('操作已取消')
        process.exit(0)
      }
      i18n = selectedI18n as boolean
    }

    // 6. 选择图表库（多选）
    if (!chartLibraries) {
      const selectedCharts = await multiselect({
        message: `请选择需要的图表库（多选）${green('[默认会生成 pages-demo 示例页面]')}`,
        options: [
          { value: 'lime-echart', label: 'lime-echart' },
          { value: 'ucharts', label: 'ucharts' },
        ],
        required: false,
      })

      if (isCancel(selectedCharts)) {
        cancel('操作已取消')
        process.exit(0)
      }

      chartLibraries = (selectedCharts as ChartLibrary[]) || []
    }

    // 7. 选择请求库（单选）
    // const requestLibrary = await select({
    //   message: `请选择请求库${green('[菲鸽封装的基本就够用了，除非您想用或会用 alovajs]')}`,
    //   options: [
    //     { value: 'request', label: '菲鸽封装' },
    //     { value: 'alovajs', label: 'alovajs' },
    //     // { value: 'vue-query', label: 'vue-query' },
    //   ],
    //   initialValue: 'request',
    // })

    // // 处理用户取消操作
    // if (isCancel(requestLibrary)) {
    //   cancel('操作已取消')
    //   process.exit(0)
    // }

    // // 7. 请选择”token策略“
    // const tokenStrategy = await select({
    //   message: `请选择token策略${green('[无论选择哪种，都需要后端配合使用]')}`,
    //   options: [
    //     { value: 'double-token', label: '双token策略（推荐）' },
    //     { value: 'single-token', label: '单token策略' },
    //   ],
    //   initialValue: 'double-token',
    // })
    // // 处理用户取消操作
    // if (isCancel(tokenStrategy)) {
    //   cancel('操作已取消')
    //   process.exit(0)
    // }

    // // 8. 格式化插件选择
    // const formatPlugin = await select({
    //   message: '格式化插件选择',
    //   options: [
    //     { value: 'eslint', label: 'ESLint（antfu+uni-helper配置）' },
    //     { value: 'oxclint', label: 'Oxclint + Prettier + Stylelint' },
    //   ],
    //   initialValue: 'oxclint',
    // })

    // // 处理用户取消操作
    // if (isCancel(formatPlugin)) {
    //   cancel('操作已取消')
    //   process.exit(0)
    // }

    return {
      projectName,
      platforms: platforms as Platform[],
      uiLibrary: uiLibrary as UILibrary,
      loginStrategy,
      i18n,
      chartLibraries: chartLibraries || [],
      // requestLibrary: requestLibrary as RequestLibrary,
      // tokenStrategy: tokenStrategy as TokenStrategy,
      // formatPlugin: formatPlugin as FormatPlugin,
    }
  }
  catch (error) {
    logger.error(`询问过程出错: ${(error as Error).message}`)
    process.exit(1)
  }
}
