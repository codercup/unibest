import type { PromptResult } from '../../types'
import path from 'node:path'
import process from 'node:process'
import { log } from '@clack/prompts'
import { getSelectedFeatures } from '../../features'
import { cloneRepoByBranch } from '../../utils/cloneRepo'
import { debug } from '../../utils/debug'
import {
  injectI18n,
  injectLimeEchart,
  injectLogin,
  injectUcharts,
} from '../../utils/injector'
import { logger } from '../../utils/logger'
import { applyUILibraryConfig } from '../../utils/uiLibrary'

const root = process.cwd()

export async function generateProject(options: PromptResult) {
  debug('generateProject options', options)
  const {
    projectName,
    platforms,
    uiLibrary,
    loginStrategy,
    i18n,
    chartLibraries,
  } = options

  const projectPath = path.join(root, projectName)

  // 1. 克隆基础模板（base 分支）
  debug('拉取 base 分支')
  await cloneRepoByBranch(root, projectName, 'base', options)

  // 2. 注入 i18n feature
  if (i18n) {
    debug('注入 i18n feature')
    const results = await injectI18n(projectPath)
    for (const result of results) {
      if (result.success) {
        debug(result.message)
      }
      else {
        logger.warn(result.message)
      }
    }
  }

  // 3. 注入 login feature
  if (loginStrategy) {
    debug('注入 login feature')
    const results = await injectLogin(projectPath)
    for (const result of results) {
      if (result.success) {
        debug(result.message)
      }
      else {
        logger.warn(result.message)
      }
    }
  }

  // 4. 注入图表库 feature
  for (const chartLibrary of chartLibraries || []) {
    if (chartLibrary === 'lime-echart') {
      debug('注入 lime-echart feature')
      const results = await injectLimeEchart(projectPath)
      for (const result of results) {
        if (result.success) {
          debug(result.message)
        }
        else {
          logger.warn(result.message)
        }
      }
    }
    if (chartLibrary === 'ucharts') {
      debug('注入 ucharts feature')
      const results = await injectUcharts(projectPath)
      for (const result of results) {
        if (result.success) {
          debug(result.message)
        }
        else {
          logger.warn(result.message)
        }
      }
    }
  }

  // 5. UI 库配置
  if (uiLibrary === 'none') {
    debug('不引入任何UI库')
  }
  else {
    debug(`配置 UI 库: ${uiLibrary}`)
    try {
      await applyUILibraryConfig(projectPath, uiLibrary)
      logger.success(`UI 库 ${uiLibrary} 配置完成`)
    }
    catch (error) {
      logger.warn(`UI 库 ${uiLibrary} 配置失败: ${(error as Error).message}`)
      logger.info('您可以在项目创建后手动配置 UI 库')
    }
  }

  // 6. 收集并安装 feature 依赖
  const selectedFeatures = getSelectedFeatures(options)
  const allDeps: Record<string, string> = {}
  for (const feature of selectedFeatures) {
    if (feature.dependencies) {
      Object.assign(allDeps, feature.dependencies)
    }
  }

  if (Object.keys(allDeps).length > 0) {
    log.info(`Feature 依赖: ${Object.keys(allDeps).join(', ')}`)
  }

  try {
    log.success(`项目${projectName}创建成功！`)
    logger.info('下一步:')
    logger.info(`  cd ${projectName}`)
    logger.info('  pnpm i')
    logger.info('  pnpm dev')
    logger.info('  运行完以上命令后，再运行其他平台')
    logger.info('  如：pnpm dev:mp, pnpm dev:app 等')
  }
  catch (error) {
    logger.error(`生成项目失败: ${(error as Error).message}`)
    throw error
  }
}
