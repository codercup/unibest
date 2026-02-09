import type { PromptResult } from '../types'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import dayjs from 'dayjs'
import { version as cliVersion } from '../../package.json'
import { getSelectedFeatures } from '../features'

function replaceContent(
  filePath: string,
  projectName: string,
  version: string,
  options: PromptResult,
) {
  const fileContent = JSON.parse(readFileSync(filePath, 'utf8'))

  // 提取旧字段值
  const unibestVersion = fileContent['unibest-version']
  const unibestUpdateTime = fileContent['unibest-update-time']

  // 删除旧字段
  delete fileContent['unibest-version']
  delete fileContent['unibest-update-time']
  delete fileContent.metadata
  delete fileContent.name
  delete fileContent.version

  // 排除 options 中的 projectName
  const { projectName: _, ...restOptions } = options

  // 收集 feature 依赖
  const selectedFeatures = getSelectedFeatures(options)
  const featureDeps: Record<string, string> = {}
  for (const feature of selectedFeatures) {
    if (feature.dependencies) {
      Object.assign(featureDeps, feature.dependencies)
    }
  }

  // 合并依赖
  if (!fileContent.dependencies) {
    fileContent.dependencies = {}
  }
  for (const [pkg, ver] of Object.entries(featureDeps)) {
    if (!fileContent.dependencies[pkg]) {
      fileContent.dependencies[pkg] = ver
    }
  }

  // 构建新对象，确保顺序
  const newContent = {
    name: projectName,
    type: fileContent.type, // 保持 type 在前（如果存在）
    version,
    unibest: {
      ...restOptions,
      cliVersion,
      unibestVersion,
      unibestUpdateTime,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    ...fileContent, // 剩余字段
  }

  writeFileSync(filePath, JSON.stringify(newContent, null, 2))
}

export function replacePackageJson(
  root: string,
  name: string,
  version: string,
  options: PromptResult,
) {
  const projectName = name.toLocaleLowerCase().replace(/\s/g, '-')
  const pkgPath = join(root, 'package.json')

  replaceContent(pkgPath, projectName, version, options)
}
