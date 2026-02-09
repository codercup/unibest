import type { PromptResult } from '../types'

/**
 * Feature 上下文
 */
export interface FeatureContext {
  /** 用户选择的选项 */
  options: PromptResult
  /** 项目路径 */
  projectPath: string
  /** Feature 名称 */
  featureName: string
}

/**
 * Feature Hooks 接口
 */
export interface FeatureHooks {
  /** 注入前执行 */
  preApply?: (ctx: FeatureContext) => Promise<void> | void
  /** 注入后执行 */
  postApply?: (ctx: FeatureContext) => Promise<void> | void
}

/**
 * Feature 定义
 */
export interface FeatureDefinition {
  /** Feature 名称 */
  name: string
  /** Feature 描述 */
  description: string
  /** 依赖的 npm 包 */
  dependencies?: Record<string, string>
  /** hooks */
  hooks?: FeatureHooks
}

/**
 * 可用的 Feature 列表
 */
export const AVAILABLE_FEATURES: FeatureDefinition[] = [
  {
    name: 'i18n',
    description: '多语言支持',
    dependencies: {
      'vue-i18n': '^9.0.0',
      'dayjs': '^1.11.0',
    },
  },
  {
    name: 'login',
    description: '登录策略（黑白名单、登录拦截等）',
    dependencies: {},
  },
  {
    name: 'lime-echart',
    description: 'lime-echart 图表库',
    dependencies: {
      'echarts': '^5.4.1',
      'lodash-es': '^4.17.21',
    },
  },
  {
    name: 'ucharts',
    description: 'uCharts 图表库',
    dependencies: {
      '@qiun/ucharts': '2.5.0-20230101',
    },
  },
]

/**
 * 根据名称获取 Feature 定义
 */
export function getFeatureByName(name: string): FeatureDefinition | undefined {
  return AVAILABLE_FEATURES.find(f => f.name === name)
}

/**
 * 获取所有选中的 Feature 定义
 */
export function getSelectedFeatures(
  options: PromptResult,
): FeatureDefinition[] {
  const features: FeatureDefinition[] = []

  if (options.i18n) {
    const feature = getFeatureByName('i18n')
    if (feature)
      features.push(feature)
  }

  if (options.loginStrategy) {
    const feature = getFeatureByName('login')
    if (feature)
      features.push(feature)
  }

  for (const library of options.chartLibraries || []) {
    const feature = getFeatureByName(library)
    if (feature)
      features.push(feature)
  }

  return features
}
