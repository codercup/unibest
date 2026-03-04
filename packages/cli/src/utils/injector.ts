import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const FEATURES_PATH = path.join(__dirname, '..', 'features')

export interface InjectResult {
  success: boolean
  message: string
}

export class FeatureInjector {
  private projectPath: string

  constructor(projectPath: string) {
    this.projectPath = projectPath
  }

  injectFile(
    targetPath: string,
    featureCode: string,
    placeholder: string,
  ): InjectResult {
    const fullPath = path.join(this.projectPath, targetPath)

    if (!fs.existsSync(fullPath)) {
      return { success: false, message: `文件不存在: ${targetPath}` }
    }

    const content = fs.readFileSync(fullPath, 'utf-8')

    if (!content.includes(placeholder)) {
      return { success: false, message: `占位符不存在: ${placeholder}` }
    }

    const newContent = content.replace(placeholder, featureCode)
    fs.writeFileSync(fullPath, newContent)

    return { success: true, message: `注入成功: ${targetPath}` }
  }

  replaceFile(targetPath: string, featureFilePath: string): InjectResult {
    const targetFullPath = path.join(this.projectPath, targetPath)
    const featureFullPath = path.join(FEATURES_PATH, featureFilePath)

    if (!fs.existsSync(featureFullPath)) {
      return {
        success: false,
        message: `Feature 文件不存在: ${featureFilePath}`,
      }
    }

    const featureContent = fs.readFileSync(featureFullPath, 'utf-8')
    fs.writeFileSync(targetFullPath, featureContent)

    return { success: true, message: `替换成功: ${targetPath}` }
  }

  createFile(relativePath: string, featureFilePath: string): InjectResult {
    const targetFullPath = path.join(this.projectPath, relativePath)
    const featureFullPath = path.join(FEATURES_PATH, featureFilePath)

    if (!fs.existsSync(featureFullPath)) {
      return {
        success: false,
        message: `Feature 文件不存在: ${featureFilePath}`,
      }
    }

    const dir = path.dirname(targetFullPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const featureContent = fs.readFileSync(featureFullPath, 'utf-8')
    fs.writeFileSync(targetFullPath, featureContent)

    return { success: true, message: `创建成功: ${relativePath}` }
  }

  appendAfter(targetPath: string, marker: string, code: string): InjectResult {
    const fullPath = path.join(this.projectPath, targetPath)

    if (!fs.existsSync(fullPath)) {
      return { success: false, message: `文件不存在: ${targetPath}` }
    }

    const content = fs.readFileSync(fullPath, 'utf-8')

    if (!content.includes(marker)) {
      return { success: false, message: `标记不存在: ${marker}` }
    }

    const newContent = content.replace(marker, `${marker}\n${code}`)
    fs.writeFileSync(fullPath, newContent)

    return { success: true, message: `追加成功: ${targetPath}` }
  }
}

export async function injectI18n(projectPath: string): Promise<InjectResult[]> {
  const results: InjectResult[] = []
  const injector = new FeatureInjector(projectPath)

  // 在 'virtual:uno.css' 后导入 i18n
  results.push(
    injector.appendAfter(
      'src/main.ts',
      `import 'virtual:uno.css'`,
      `import i18n from './locale/index'`,
    ),
  )

  // 在 requestInterceptor 后使用 i18n
  results.push(
    injector.appendAfter(
      'src/main.ts',
      `  app.use(requestInterceptor)`,
      `  app.use(i18n)`,
    ),
  )

  // 完整替换需要修改的文件
  results.push(
    injector.replaceFile(
      'src/tabbar/config.ts',
      'i18n/files/src/tabbar/config.ts',
    ),
  )

  results.push(
    injector.replaceFile(
      'src/tabbar/index.vue',
      'i18n/files/src/tabbar/index.vue',
    ),
  )

  results.push(
    injector.replaceFile(
      'src/tabbar/TabbarItem.vue',
      'i18n/files/src/tabbar/TabbarItem.vue',
    ),
  )

  results.push(
    injector.replaceFile('src/utils/index.ts', 'i18n/files/src/utils/index.ts'),
  )

  results.push(
    injector.replaceFile('src/store/token.ts', 'i18n/files/src/store/token.ts'),
  )

  // 复制 i18n 专用文件
  const i18nFiles = [
    'src/locale/index.ts',
    'src/locale/en.json',
    'src/locale/zh-Hans.json',
    'src/locale/README.md',
    'src/utils/i18n.ts',
    'src/types/i18n.d.ts',
    'src/tabbar/i18n.ts',
    'src/pages/i18n/index.vue',
  ]

  for (const file of i18nFiles) {
    const featurePath = `i18n/files/${file}`
    results.push(injector.createFile(file, featurePath))
  }

  return results
}

export async function injectLogin(
  projectPath: string,
): Promise<InjectResult[]> {
  const results: InjectResult[] = []
  const injector = new FeatureInjector(projectPath)

  // 替换 router/interceptor.ts
  results.push(
    injector.replaceFile(
      'src/router/interceptor.ts',
      'login/files/src/router/interceptor.ts',
    ),
  )

  // 替换 router/config.ts
  results.push(
    injector.replaceFile(
      'src/router/config.ts',
      'login/files/src/router/config.ts',
    ),
  )

  // 替换 pages/me/me.vue
  results.push(
    injector.replaceFile('src/pages/me/me.vue', 'login/files/src/pages/me.vue'),
  )

  // 创建 login 专用文件
  const loginFiles = [
    'src/pages/auth/login.vue',
    'src/pages/auth/register.vue',
    'src/pages/auth/README.md',
  ]

  for (const file of loginFiles) {
    const featurePath = `login/files/${file}`
    results.push(injector.createFile(file, featurePath))
  }

  return results
}

function ensurePagesDemoSubPackage(projectPath: string): InjectResult {
  const configPath = path.join(projectPath, 'pages.config.ts')
  if (!fs.existsSync(configPath)) {
    return { success: false, message: '文件不存在: pages.config.ts' }
  }

  let content = fs.readFileSync(configPath, 'utf-8')

  if (
    content.includes('root: \'pages-demo\'')
    || content.includes('root: "pages-demo"')
  ) {
    return { success: true, message: 'pages-demo 已存在' }
  }

  const entry = `{\n    root: 'pages-demo',\n    pages: [],\n  }`

  if (/subPackages:\s*\[\s*\]/.test(content)) {
    content = content.replace(
      /subPackages:\s*\[\s*\]/,
      `subPackages: [${entry}]`,
    )
  }
  else if (/subPackages:\s*\[/.test(content)) {
    content = content.replace(
      /subPackages:\s*\[/,
      `subPackages: [\n  ${entry},`,
    )
  }
  else {
    if (content.includes('tabBar:')) {
      content = content.replace(
        /\n\s*tabBar:\s*/,
        `\n  subPackages: [${entry}],\n  tabBar: `,
      )
    }
    else if (content.includes('defineUniPages({')) {
      content = content.replace(
        /\n\}\)\s*$/,
        `\n  subPackages: [${entry}],\n})`,
      )
    }
    else {
      return { success: false, message: '未找到 defineUniPages 配置' }
    }
  }

  fs.writeFileSync(configPath, content)
  return {
    success: true,
    message: '已更新 pages.config.ts 的 pages-demo 配置',
  }
}

export async function injectLimeEchart(
  projectPath: string,
): Promise<InjectResult[]> {
  const results: InjectResult[] = []
  const injector = new FeatureInjector(projectPath)

  results.push(ensurePagesDemoSubPackage(projectPath))

  const limeFiles = [
    'src/uni_modules/lime-echart/package.json',
    'src/uni_modules/lime-echart/static/uvue.html',
    'src/uni_modules/lime-echart/static/echarts.min.js',
    'src/uni_modules/lime-echart/static/ecStat.min.js',
    'src/uni_modules/lime-echart/static/uni.webview.1.5.5.js',
    'src/uni_modules/lime-echart/components/lime-echart/lime-echart.vue',
    'src/uni_modules/lime-echart/components/lime-echart/lime-echart.nvue',
    'src/uni_modules/lime-echart/components/lime-echart/lime-echart.uvue',
    'src/uni_modules/lime-echart/components/l-echart/utils.js',
    'src/uni_modules/lime-echart/components/l-echart/uvue.uts',
    'src/uni_modules/lime-echart/components/l-echart/nvue.js',
    'src/uni_modules/lime-echart/components/l-echart/l-echart.vue',
    'src/uni_modules/lime-echart/components/l-echart/canvas.js',
    'src/uni_modules/lime-echart/components/l-echart/l-echart.uvue',
    'src/pages-demo/hooks/useEcharts.ts',
    'src/pages-demo/lime-echarts/index.vue',
    'src/pages-demo/lime-echarts/index2.vue',
    'src/pages-demo/lime-echarts/index2.ts',
  ]

  for (const file of limeFiles) {
    const featurePath = `lime-echart/files/${file}`
    results.push(injector.createFile(file, featurePath))
  }

  return results
}

export async function injectUcharts(
  projectPath: string,
): Promise<InjectResult[]> {
  const results: InjectResult[] = []
  const injector = new FeatureInjector(projectPath)

  results.push(ensurePagesDemoSubPackage(projectPath))

  const uchartsFiles = [
    'src/components/qiun-data-charts/config-ucharts.js',
    'src/components/qiun-data-charts/config-echarts.js',
    'src/components/qiun-data-charts/qiun-data-charts.vue',
    'src/components/qiun-data-charts/u-charts.js',
    'src/components/qiun-error/qiun-error.vue',
    'src/components/qiun-loading/loading1.vue',
    'src/components/qiun-loading/loading2.vue',
    'src/components/qiun-loading/loading3.vue',
    'src/components/qiun-loading/loading4.vue',
    'src/components/qiun-loading/loading5.vue',
    'src/components/qiun-loading/qiun-loading.vue',
    'src/components/qiun-title-bar/qiun-title-bar.vue',
    'src/pages-demo/ucharts/index.vue',
    'src/pages-demo/ucharts/data.json',
  ]

  for (const file of uchartsFiles) {
    const featurePath = `ucharts/files/${file}`
    results.push(injector.createFile(file, featurePath))
  }

  return results
}
