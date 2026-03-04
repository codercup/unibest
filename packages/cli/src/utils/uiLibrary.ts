import type { UILibrary } from '../types'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * UI 库配置接口
 */
export interface UILibraryConfig {
  /** 包名 */
  packageName: string
  /** easycom 配置 */
  easycom?: {
    pattern: string
    path: string
  }
  /** TypeScript 类型配置 */
  types?: string[]
  /** 是否需要在 main.ts 中引入 */
  needMainImport?: boolean
  /** main.ts 中的引入代码 */
  mainImport?: string
  /** 是否需要在 uni.scss 中引入样式 */
  needUniScss?: boolean
  /** uni.scss 中的引入代码 */
  uniScssImport?: string
  /** 是否需要在 App.vue 中引入样式 */
  needAppVue?: boolean
  /** App.vue 中的引入代码 */
  appVueImport?: string
}

/**
 * UI 库配置映射
 */
export const UI_LIBRARY_CONFIGS: Record<UILibrary, UILibraryConfig | null> = {
  'none': null,
  'wot-ui': {
    packageName: 'wot-design-uni',
    easycom: {
      pattern: '^wd-(.*)',
      path: 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
    types: ['wot-design-uni/global.d.ts'],
  },
  'sard-uniapp': {
    packageName: 'sard-uniapp',
    easycom: {
      pattern: '^sar-(.*)',
      path: 'sard-uniapp/components/$1/$1.vue',
    },
    types: ['sard-uniapp/global'],
    appVueImport: '@import \'sard-uniapp/index.scss\';',
  },
  'uview-pro': {
    packageName: 'uview-pro',
    easycom: {
      pattern: '^u-(.*)',
      path: 'uview-pro/components/u-$1/u-$1.vue',
    },
    needMainImport: true,
    mainImport: 'import uViewPro from \'uview-pro\';',
    needUniScss: true,
    uniScssImport: '@import \'uview-pro/theme.scss\';',
    needAppVue: true,
    appVueImport: '@import \'uview-pro/index.scss\';',
  },
  'uv-ui': {
    packageName: '@climblee/uv-ui',
    easycom: {
      pattern: '^uv-(.*)',
      path: '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
    },
    types: ['@ttou/uv-typings/shim', '@ttou/uv-typings/v2'],
  },
  'uview-plus': {
    packageName: 'uview-plus',
    // uview-plus 需要多个 easycom 配置
    easycom: {
      pattern: '^u--(.*)',
      path: 'uview-plus/components/u-$1/u-$1.vue',
    },
    types: ['uview-plus/types'],
    needUniScss: true,
    uniScssImport: '@import \'uview-plus/theme.scss\'; // /* 行为相关颜色 */',
  },
  'tdesign': {
    packageName: '@tdesign/uniapp',
    easycom: {
      pattern: '^t-(.*)',
      path: '@tdesign/uniapp/$1/$1.vue',
    },
    mainImport: 'import \'@tdesign/uniapp/common/style/theme/index.css\';',
    types: ['@tdesign/uniapp/global.d.ts'],
  },
}

/**
 * 获取 UI 库配置
 */
export function getUILibraryConfig(uiLibrary: UILibrary): UILibraryConfig | null {
  return UI_LIBRARY_CONFIGS[uiLibrary]
}

/**
 * 应用 UI 库配置到项目
 */
export async function applyUILibraryConfig(projectPath: string, uiLibrary: UILibrary): Promise<void> {
  // 如果选择的是 none，直接返回
  if (uiLibrary === 'none') {
    return
  }

  const config = getUILibraryConfig(uiLibrary)
  if (!config) {
    return // 未配置的 UI 库，直接返回
  }

  // 1. 更新 package.json
  await updatePackageJson(projectPath, config.packageName)

  // 2. 更新 pages.config.ts
  if (config.easycom) {
    await updatePagesConfig(projectPath, config.easycom)

    // uview-plus 需要多个 easycom 配置
    if (uiLibrary === 'uview-plus') {
      await updatePagesConfig(projectPath, {
        pattern: '^up-(.*)',
        path: 'uview-plus/components/u-$1/u-$1.vue',
      })
      await updatePagesConfig(projectPath, {
        pattern: '^u-([^-].*)',
        path: 'uview-plus/components/u-$1/u-$1.vue',
      })
    }
  }

  // 3. 更新 tsconfig.json
  if (config.types && config.types.length > 0) {
    await updateTsConfig(projectPath, config.types)
  }

  // 4. 更新 main.ts
  if (config.needMainImport && config.mainImport) {
    await updateMainTs(projectPath, config.mainImport)
  }

  // 5. 更新 uni.scss
  if (config.needUniScss && config.uniScssImport) {
    await updateUniScss(projectPath, config.uniScssImport)
  }

  // 6. 更新 App.vue
  if (config.needAppVue && config.appVueImport) {
    await updateAppVue(projectPath, config.appVueImport)
  }
}

/**
 * 更新 package.json，添加 UI 库依赖
 */
async function updatePackageJson(projectPath: string, packageName: string): Promise<void> {
  const packageJsonPath = join(projectPath, 'package.json')
  if (!existsSync(packageJsonPath)) {
    return
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  if (!packageJson.dependencies) {
    packageJson.dependencies = {}
  }

  // 如果依赖已存在，不重复添加
  if (!packageJson.dependencies[packageName]) {
    packageJson.dependencies[packageName] = 'latest'
  }

  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`)
}

/**
 * 更新 pages.config.ts，添加 easycom 配置
 */
async function updatePagesConfig(projectPath: string, easycom: { pattern: string, path: string }): Promise<void> {
  const pagesConfigPath = join(projectPath, 'pages.config.ts')
  if (!existsSync(pagesConfigPath)) {
    return
  }

  const originalContent = readFileSync(pagesConfigPath, 'utf8')
  let content = originalContent

  const patternLiteral = escapeSingleQuotes(easycom.pattern)
  const pathLiteral = escapeSingleQuotes(easycom.path)
  const existingEntryRegex = new RegExp(
    `["']${escapeForRegExp(patternLiteral)}["']\\s*:\\s*["']${escapeForRegExp(pathLiteral)}["']`,
  )

  if (existingEntryRegex.test(content)) {
    return
  }

  const entry = { pattern: patternLiteral, path: pathLiteral }

  content
    = addToExistingCustomBlock(content, entry)
      ?? addCustomBlock(content, entry)
      ?? addEasycomBlock(content, entry)
      ?? appendEasycomBlock(content, entry)

  if (content !== originalContent) {
    writeFileSync(pagesConfigPath, ensureTrailingNewline(content))
  }
}

/**
 * 更新 tsconfig.json，添加类型配置
 */
async function updateTsConfig(projectPath: string, types: string[]): Promise<void> {
  const tsConfigPath = join(projectPath, 'tsconfig.json')
  if (!existsSync(tsConfigPath)) {
    return
  }

  const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf8'))

  if (!tsConfig.compilerOptions) {
    tsConfig.compilerOptions = {}
  }

  if (!tsConfig.compilerOptions.types) {
    tsConfig.compilerOptions.types = []
  }

  // 添加新的类型，避免重复
  const existingTypes = tsConfig.compilerOptions.types as string[]
  for (const type of types) {
    if (!existingTypes.includes(type)) {
      existingTypes.push(type)
    }
  }

  writeFileSync(tsConfigPath, `${JSON.stringify(tsConfig, null, 2)}\n`)
}

/**
 * 更新 main.ts，添加 UI 库引入
 */
async function updateMainTs(projectPath: string, importCode: string): Promise<void> {
  const mainTsPath = join(projectPath, 'src', 'main.ts')
  if (!existsSync(mainTsPath)) {
    return
  }

  let content = readFileSync(mainTsPath, 'utf8')

  // 检查是否已存在该引入（通过包名检查）
  const firstLine = importCode.split('\n')[0]
  if (content.includes(firstLine)) {
    return
  }

  // 查找 import { createSSRApp } from "vue" 的位置
  const vueImportRegex = /(import\s+(?:\S.*)?from\s+['"]vue['"];?\s*\n)/
  const match = content.match(vueImportRegex)

  if (match) {
    // 在 vue import 之后添加 UI 库引入
    content = content.replace(vueImportRegex, `$1${importCode}\n`)
  }
  else {
    // 如果找不到 vue import，在文件开头添加
    content = `${importCode}\n\n${content}`
  }

  // 对于 uview-pro，需要添加 app.use(uViewPro)
  if (importCode.includes('uview-pro')) {
    const appUseRegex = /(const\s+app\s*=\s*createSSRApp\(App\);?\s*\n)/
    const appUseMatch = content.match(appUseRegex)

    if (appUseMatch && !content.includes('app.use(uViewPro)')) {
      content = content.replace(appUseRegex, `$1  app.use(uViewPro);\n`)
    }
  }

  writeFileSync(mainTsPath, content)
}

/**
 * 更新 uni.scss，添加样式引入
 */
async function updateUniScss(projectPath: string, importCode: string): Promise<void> {
  const uniScssPath = join(projectPath, 'src', 'uni.scss')
  if (!existsSync(uniScssPath)) {
    // 尝试其他可能的位置
    const altPath = join(projectPath, 'uni.scss')
    if (existsSync(altPath)) {
      await updateScssFile(altPath, importCode)
    }
    return
  }

  await updateScssFile(uniScssPath, importCode)
}

/**
 * 更新 SCSS 文件，在末尾添加引入
 */
async function updateScssFile(filePath: string, importCode: string): Promise<void> {
  let content = readFileSync(filePath, 'utf8')

  // 检查是否已存在该引入
  if (content.includes(importCode)) {
    return
  }

  // 在文件末尾添加引入
  content = `${content.trim()}\n${importCode}\n`
  writeFileSync(filePath, content)
}

/**
 * 更新 App.vue，添加样式引入
 */
async function updateAppVue(projectPath: string, importCode: string): Promise<void> {
  const appVuePath = join(projectPath, 'src', 'App.vue')
  if (!existsSync(appVuePath)) {
    return
  }

  let content = readFileSync(appVuePath, 'utf8')

  // 检查是否已存在该引入
  if (content.includes(importCode)) {
    return
  }

  // 查找 <style> 标签
  const styleRegex = /(<style[^>]*>)/
  const match = content.match(styleRegex)

  if (match) {
    // 在 <style> 标签后添加引入
    content = content.replace(styleRegex, `$1\n${importCode}`)
  }
  else {
    // 如果没有 style 标签，在文件末尾添加
    content = `${content}\n<style lang="scss">\n${importCode}</style>`
  }

  writeFileSync(appVuePath, content)
}

interface EasycomEntry {
  pattern: string
  path: string
}

function addToExistingCustomBlock(content: string, entry: EasycomEntry): string | null {
  const customIndex = content.indexOf('custom:')
  if (customIndex === -1) {
    return null
  }

  const braceIndex = content.indexOf('{', customIndex)
  if (braceIndex === -1) {
    return null
  }

  const closingIndex = findMatchingBrace(content, braceIndex)
  if (closingIndex === -1) {
    return null
  }

  const inside = content.slice(braceIndex + 1, closingIndex)
  const hasEntries = inside.trim().length > 0
  const entryIndent = `${getLineIndent(content, braceIndex)}  `
  const entryLine = `${entryIndent}'${entry.pattern}': '${entry.path}',`

  if (!hasEntries) {
    const closingIndent = getLineIndent(content, closingIndex)
    return (
      `${content.slice(0, braceIndex + 1)
      }
${entryLine}
${closingIndent}${
        content.slice(closingIndex)}`
    )
  }

  const beforeRaw = content.slice(0, closingIndex).replace(/\s*$/, '')
  const separator = beforeRaw.endsWith('\n') ? '' : '\n'
  const after = content.slice(closingIndex)
  return `${beforeRaw}${separator}${entryLine}
${after}`
}

function addCustomBlock(content: string, entry: EasycomEntry): string | null {
  const easycomIndex = content.indexOf('easycom:')
  if (easycomIndex === -1) {
    return null
  }

  const braceIndex = content.indexOf('{', easycomIndex)
  if (braceIndex === -1) {
    return null
  }

  const closingIndex = findMatchingBrace(content, braceIndex)
  if (closingIndex === -1) {
    return null
  }

  const easycomIndent = getLineIndent(content, braceIndex)
  const customIndent = `${easycomIndent}  `
  const entryIndent = `${customIndent}  `
  const customBlock = `${customIndent}custom: {
${entryIndent}'${entry.pattern}': '${entry.path}',
${customIndent}},`

  const beforeRaw = content.slice(0, closingIndex).replace(/\s*$/, '')
  const separator = beforeRaw.endsWith('\n') ? '' : '\n'
  const after = content.slice(closingIndex)
  return `${beforeRaw}${separator}${customBlock}
${after}`
}

function addEasycomBlock(content: string, entry: EasycomEntry): string | null {
  const exportIndex = content.indexOf('export default')
  if (exportIndex === -1) {
    return null
  }

  const braceIndex = content.indexOf('{', exportIndex)
  if (braceIndex === -1) {
    return null
  }

  const closingIndex = findMatchingBrace(content, braceIndex)
  if (closingIndex === -1) {
    return null
  }

  const blockIndent = `${getLineIndent(content, braceIndex)}  `
  const entryIndent = `${blockIndent}  `
  const block = `${blockIndent}easycom: {
${blockIndent}  autoscan: true,
${blockIndent}  custom: {
${entryIndent}'${entry.pattern}': '${entry.path}',
${blockIndent}  },
${blockIndent}},`

  const before = content.slice(0, braceIndex + 1)
  const after = content.slice(braceIndex + 1)
  const prefix = before.endsWith('\n') ? before : `${before}\n`
  return `${prefix}${block}
${after}`
}

function appendEasycomBlock(content: string, entry: EasycomEntry): string {
  const block = `
export const easycom = {
  autoscan: true,
  custom: {
    '${entry.pattern}': '${entry.path}',
  },
}
`
  return `${content}${block}`
}

function findMatchingBrace(content: string, startIndex: number): number {
  let depth = 0
  for (let i = startIndex; i < content.length; i += 1) {
    const char = content[i]
    if (char === '{') {
      depth += 1
    }
    else if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return i
      }
    }
  }
  return -1
}

function getLineIndent(content: string, index: number): string {
  const lineStart = content.lastIndexOf('\n', index) + 1
  const line = content.slice(lineStart, index)
  const match = line.match(/^\s*/)
  return match ? match[0] : ''
}

function escapeSingleQuotes(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')
}

function escapeForRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function ensureTrailingNewline(value: string): string {
  return value.endsWith('\n') ? value : `${value}\n`
}
