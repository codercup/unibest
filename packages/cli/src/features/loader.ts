import type { FeatureContext } from './interface'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 从 CLI 包的安装目录查找 features
const FEATURES_DIR = path.resolve(__dirname, '..', 'features')

/**
 * 加载 Feature 资源文件
 */
export async function loadFeatureFiles(featureName: string): Promise<Map<string, string>> {
  const files = new Map<string, string>()
  const featurePath = path.join(FEATURES_DIR, featureName, 'files')

  if (!fs.existsSync(featurePath)) {
    return files
  }

  function scanDir(dir: string, baseDir: string = featurePath) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.relative(baseDir, fullPath)

      if (entry.isDirectory()) {
        scanDir(fullPath, baseDir)
      }
      else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.json'))) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        files.set(relativePath, content)
      }
    }
  }

  scanDir(featurePath)
  return files
}

/**
 * 加载 Feature schema
 */
export async function loadFeatureSchema(featureName: string): Promise<Record<string, any> | null> {
  const schemaPath = path.join(FEATURES_DIR, featureName, 'schema.json')

  if (!fs.existsSync(schemaPath)) {
    return null
  }

  const content = fs.readFileSync(schemaPath, 'utf-8')
  return JSON.parse(content)
}

/**
 * 加载 Feature hooks
 */
export async function loadFeatureHooks(featureName: string): Promise<FeatureContext['options'] | null> {
  const hooksPath = path.join(FEATURES_DIR, featureName, 'hooks.js')

  if (!fs.existsSync(hooksPath)) {
    return null
  }

  // 动态导入 hooks 文件
  const module = await import(hooksPath)
  return module
}

/**
 * 获取所有可用的 Feature 名称
 */
export function getAvailableFeatureNames(): string[] {
  if (!fs.existsSync(FEATURES_DIR)) {
    return []
  }

  const entries = fs.readdirSync(FEATURES_DIR, { withFileTypes: true })
  return entries
    .filter(e => e.isDirectory() && fs.existsSync(path.join(FEATURES_DIR, e.name, 'files')))
    .map(e => e.name)
}
