import type minimist from 'minimist'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { cancel, intro, isCancel, log, multiselect } from '@clack/prompts'
import { bold, green } from 'kolorist'
import { version } from '../../package.json'
import { getFeatureByName } from '../features/interface'
import { getAvailableFeatureNames, loadFeatureHooks } from '../features/loader'
import { injectI18n, injectLimeEchart, injectLogin, injectUcharts } from '../utils/injector'
import { logger } from '../utils/logger'
import { readPackageJson, writePackageJson } from '../utils/readPackageJson'

interface AddOptions {
  path?: string
  feature?: string | string[]
  force?: boolean
}

interface FeatureStatus {
  name: string
  enabled: boolean
  addedAt?: string
}

function getFeatureStatusFromPackageJson(pkgPath: string): Record<string, boolean> {
  try {
    const pkg = readPackageJson(pkgPath)
    return {
      'i18n': pkg.unibest?.i18n === true,
      'login': pkg.unibest?.loginStrategy === true,
      'lime-echart': pkg.unibest?.charts?.limeEchart === true,
      'ucharts': pkg.unibest?.charts?.ucharts === true,
    }
  }
  catch {
    return { 'i18n': false, 'login': false, 'lime-echart': false, 'ucharts': false }
  }
}

function updatePackageJsonForFeature(pkgPath: string, featureName: string): void {
  const pkg = readPackageJson(pkgPath)

  if (!pkg.unibest) {
    pkg.unibest = {}
  }

  switch (featureName) {
    case 'i18n':
      pkg.unibest.i18n = true
      break
    case 'login':
      pkg.unibest.loginStrategy = true
      break
    case 'lime-echart':
      pkg.unibest.charts = {
        ...pkg.unibest.charts,
        limeEchart: true,
      }
      break
    case 'ucharts':
      pkg.unibest.charts = {
        ...pkg.unibest.charts,
        ucharts: true,
      }
      break
  }

  writePackageJson(pkgPath, pkg)
}

async function checkFeatureStatus(projectPath: string): Promise<FeatureStatus[]> {
  const pkgPath = path.join(projectPath, 'package.json')
  const statusFromPkg = getFeatureStatusFromPackageJson(pkgPath)

  return [
    { name: 'i18n', enabled: statusFromPkg.i18n },
    { name: 'login', enabled: statusFromPkg.login },
    { name: 'lime-echart', enabled: statusFromPkg['lime-echart'] },
    { name: 'ucharts', enabled: statusFromPkg.ucharts },
  ]
}

async function addFeature(
  featureName: string,
  projectPath: string,
  options: AddOptions = {},
): Promise<boolean> {
  const feature = getFeatureByName(featureName)
  if (!feature) {
    logger.error(`未知的 Feature: ${featureName}`)
    return false
  }

  const pkgPath = path.join(projectPath, 'package.json')
  const pkg = readPackageJson(pkgPath)

  // 检查是否已添加过
  let alreadyAdded = false
  if (featureName === 'i18n' && pkg.unibest?.i18n === true) {
    alreadyAdded = true
  }
  else if (featureName === 'login' && pkg.unibest?.loginStrategy === true) {
    alreadyAdded = true
  }
  else if (featureName === 'lime-echart' && pkg.unibest?.charts?.limeEchart === true) {
    alreadyAdded = true
  }
  else if (featureName === 'ucharts' && pkg.unibest?.charts?.ucharts === true) {
    alreadyAdded = true
  }

  if (alreadyAdded && !options.force) {
    logger.warn(`Feature ${featureName} 已添加过，如需重新注入请使用 --force 参数`)
    return true
  }

  log.info(`正在添加 Feature: ${green(featureName)} - ${feature.description}`)

  try {
    // 执行注入
    let results
    switch (featureName) {
      case 'i18n':
        results = await injectI18n(projectPath)
        break
      case 'login':
        results = await injectLogin(projectPath)
        break
      case 'lime-echart':
        results = await injectLimeEchart(projectPath)
        break
      case 'ucharts':
        results = await injectUcharts(projectPath)
        break
      default:
        logger.error(`不支持的 Feature: ${featureName}`)
        return false
    }

    // 打印注入结果
    for (const result of results) {
      if (result.success) {
        logger.success(result.message)
      }
      else {
        logger.warn(result.message)
      }
    }

    // 执行 hooks
    const hooks: any = await loadFeatureHooks(featureName)
    if (hooks?.postApply) {
      await hooks.postApply({
        options: { projectName: '', platforms: [], uiLibrary: 'none', i18n: true, loginStrategy: true },
        projectPath,
        featureName,
      })
    }

    // 更新 package.json 的 unibest 字段
    updatePackageJsonForFeature(pkgPath, featureName)
    logger.success(`已更新 package.json 的 unibest 配置`)

    // 安装依赖
    if (feature.dependencies && Object.keys(feature.dependencies).length > 0) {
      logger.info(`安装依赖: ${Object.keys(feature.dependencies).join(', ')}`)
    }

    logger.success(`Feature ${featureName} 添加成功！`)
    return true
  }
  catch (error) {
    logger.error(`添加 Feature 失败: ${(error as Error).message}`)
    return false
  }
}

export async function addCommand(args: minimist.ParsedArgs): Promise<void> {
  const options: AddOptions = {
    path: args.path || args.p || '.',
    feature: args._[1] || args.feature || args.f,
    force: args.force || args.f,
  }

  intro(bold(green(`create-unibest@v${version} 添加 Feature`)))

  // 解析项目路径
  const projectPath = path.isAbsolute(options.path!)
    ? options.path!
    : path.join(process.cwd(), options.path!)

  // 验证项目
  const pkgPath = path.join(projectPath, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    logger.error(`项目不存在: ${projectPath}`)
    process.exit(1)
  }

  const pkg = readPackageJson(pkgPath)
  if (pkg.name !== 'unibest') {
    logger.warn(`当前项目可能不是 unibest 项目: ${pkg.name}`)
  }

  // 获取可用的 Feature
  const availableFeatures = getAvailableFeatureNames()

  try {
    // 如果没有指定 feature，则让用户选择
    if (!options.feature) {
      // 检测已启用的 Feature
      const detected = await checkFeatureStatus(projectPath)
      const available = availableFeatures.filter(f => !detected.find(d => d.name === f && d.enabled))

      if (available.length === 0) {
        logger.info('所有可用 Feature 已启用')
        return
      }

      const selectedFeatures = await multiselect({
        message: `请选择要添加的 Feature`,
        options: available.map((name) => {
          const feature = getFeatureByName(name)
          return {
            value: name,
            label: feature?.name || name,
            hint: feature?.description || '',
          }
        }),
        required: false,
      })

      if (isCancel(selectedFeatures)) {
        cancel('操作已取消')
        process.exit(0)
      }

      if (!Array.isArray(selectedFeatures) || selectedFeatures.length === 0) {
        logger.info('未选择任何 Feature')
        return
      }

      // 逐个添加
      for (const featureName of selectedFeatures) {
        await addFeature(featureName as string, projectPath, options)
      }
    }
    else {
      // 添加单个或多个指定 feature
      const features = Array.isArray(options.feature) ? options.feature : [options.feature]
      for (const featureName of features) {
        await addFeature(featureName, projectPath, options)
      }
    }
  }
  catch (error) {
    logger.error(`添加 Feature 失败: ${(error as Error).message}`)
    process.exit(1)
  }
}
