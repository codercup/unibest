import type { Plugin } from 'vite'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'

/**
 * 原生插件资源复制配置接口
 *
 * 根据 UniApp 官方文档：https://uniapp.dcloud.net.cn/plugin/native-plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6
 * 本地插件应该存储在项目根目录的 nativeplugins 目录下
 */
export interface CopyNativeResourcesOptions {
  /** 是否启用插件 */
  enable?: boolean
  /**
   * 源目录路径，相对于项目根目录
   * 默认为 'nativeplugins'，符合 UniApp 官方规范
   * @see https://uniapp.dcloud.net.cn/plugin/native-plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6
   */
  sourceDir?: string
  /**
   * 目标目录名称，构建后在 dist 目录中的文件夹名
   * 默认为 'nativeplugins'，与源目录保持一致
   */
  targetDirName?: string
  /** 是否显示详细日志，便于调试和监控复制过程 */
  verbose?: boolean
  /** 自定义日志前缀，用于区分不同插件的日志输出 */
  logPrefix?: string
}

/**
 * 默认配置
 *
 * 根据 UniApp 官方文档规范设置默认值：
 * - sourceDir: 'nativeplugins' - 符合官方本地插件存储规范
 * - targetDirName: 'nativeplugins' - 构建后保持相同的目录结构
 */
const DEFAULT_OPTIONS: Required<CopyNativeResourcesOptions> = {
  enable: true,
  sourceDir: 'nativeplugins',
  targetDirName: 'nativeplugins',
  verbose: true,
  logPrefix: '[copy-native-resources]',
}

/**
 * UniApp 原生插件资源复制插件
 *
 * 功能说明：
 * 1. 解决 UniApp 使用本地原生插件时，打包后原生插件资源找不到的问题
 * 2. 将项目根目录下的 nativeplugins 目录复制到构建输出目录中
 * 3. 支持 Android 和 iOS 平台的原生插件资源复制
 * 4. 仅在 app 平台构建时生效，其他平台（H5、小程序）不执行
 *
 * 使用场景：
 * - 使用了 UniApp 本地原生插件（非云端插件）
 * - 原生插件包含额外的资源文件（如 .so 库文件、配置文件等）
 * - 需要在打包后保持原生插件的完整目录结构
 *
 * 官方文档参考：
 * @see https://uniapp.dcloud.net.cn/plugin/native-plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6
 * @see https://uniapp.dcloud.net.cn/tutorial/nvue-api.html#dom
 *
 * @param options 插件配置选项
 * @returns Vite 插件对象
 */
export function copyNativeResources(options: CopyNativeResourcesOptions = {}): Plugin {
  const config = { ...DEFAULT_OPTIONS, ...options }

  // 如果插件被禁用，返回一个空插件
  if (!config.enable) {
    return {
      name: 'copy-native-resources-disabled',
      apply: 'build',
      writeBundle() {
        // 插件已禁用，不执行任何操作
      },
    }
  }

  return {
    name: 'copy-native-resources',
    apply: 'build', // 只在构建时应用
    enforce: 'post', // 在其他插件执行完毕后执行

    async writeBundle() {
      const { sourceDir, targetDirName, verbose, logPrefix } = config

      try {
        // 获取项目根目录路径
        const projectRoot = process.cwd()

        // 构建源目录绝对路径（项目根目录下的 nativeplugins 目录）
        const sourcePath = path.resolve(projectRoot, sourceDir)

        // 构建目标路径：dist/[build|dev]/[platform]/nativeplugins
        // buildMode: 'build' (生产环境) 或 'dev' (开发环境)
        // platform: 'app' (App平台) 或其他平台标识
        const buildMode = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
        const platform = process.env.UNI_PLATFORM || 'app'
        const targetPath = path.resolve(
          projectRoot,
          'dist',
          buildMode,
          platform,
          targetDirName,
        )

        // 检查源目录是否存在
        // 如果不存在 nativeplugins 目录，说明项目没有使用本地原生插件
        const sourceExists = await fs.pathExists(sourcePath)
        if (!sourceExists) {
          if (verbose) {
            console.warn(`${logPrefix} 源目录不存在，跳过复制操作`)
            console.warn(`${logPrefix} 源目录路径: ${sourcePath}`)
            console.warn(`${logPrefix} 如需使用本地原生插件，请在项目根目录创建 nativeplugins 目录`)
            console.warn(`${logPrefix} 并按照官方文档放入原生插件文件`)
            console.warn(`${logPrefix} 参考: https://uniapp.dcloud.net.cn/plugin/native-plugin.html`)
          }
          return
        }

        // 检查源目录是否为空
        // 如果目录存在但为空，也跳过复制操作
        const sourceFiles = await fs.readdir(sourcePath)
        if (sourceFiles.length === 0) {
          if (verbose) {
            console.warn(`${logPrefix} 源目录为空，跳过复制操作`)
            console.warn(`${logPrefix} 源目录路径: ${sourcePath}`)
            console.warn(`${logPrefix} 请在 nativeplugins 目录中放入原生插件文件`)
          }
          return
        }

        // 确保目标目录及其父目录存在
        await fs.ensureDir(targetPath)

        if (verbose) {
          console.log(`${logPrefix} 开始复制 UniApp 本地原生插件...`)
          console.log(`${logPrefix} 源目录: ${sourcePath}`)
          console.log(`${logPrefix} 目标目录: ${targetPath}`)
          console.log(`${logPrefix} 构建模式: ${buildMode}`)
          console.log(`${logPrefix} 目标平台: ${platform}`)
          console.log(`${logPrefix} 发现 ${sourceFiles.length} 个原生插件文件/目录`)
        }

        // 执行文件复制操作
        // 将整个 nativeplugins 目录复制到构建输出目录
        await fs.copy(sourcePath, targetPath, {
          overwrite: true, // 覆盖已存在的文件，确保使用最新版本
          errorOnExist: false, // 如果目标文件存在不报错
          preserveTimestamps: true, // 保持文件的时间戳
        })

        if (verbose) {
          console.log(`${logPrefix} ✅ UniApp 本地原生插件复制完成`)
          console.log(`${logPrefix} 已成功复制 ${sourceFiles.length} 个文件/目录到构建目录`)
          console.log(`${logPrefix} 原生插件现在可以在 App 中正常使用`)
        }
      }
      catch (error) {
        console.error(`${config.logPrefix} ❌ 复制 UniApp 本地原生插件失败:`, error)
        console.error(`${config.logPrefix} 错误详情:`, error instanceof Error ? error.message : String(error))
        console.error(`${config.logPrefix} 请检查源目录权限和磁盘空间`)
        // 不抛出错误，避免影响整个构建过程，但会记录详细的错误信息
      }
    },
  }
}

/**
 * 创建 UniApp 本地原生插件资源复制插件的便捷函数
 *
 * 这是一个便捷的工厂函数，用于快速创建插件实例
 * 特别适用于在 vite.config.ts 中进行条件性插件配置
 *
 * 使用示例：
 * ```typescript
 * // 在 vite.config.ts 中
 * plugins: [
 *   // 仅在 app 平台且启用时生效
 *   UNI_PLATFORM === 'app'
 *     ? createCopyNativeResourcesPlugin(
 *         VITE_COPY_NATIVE_RES_ENABLE === 'true',
 *         { verbose: mode === 'development' }
 *       )
 *     : null,
 * ]
 * ```
 *
 * @param enable 是否启用插件，通常通过环境变量控制
 * @param options 其他配置选项，不包含 enable 属性
 * @returns Vite 插件对象
 */
export function createCopyNativeResourcesPlugin(
  enable: boolean = true,
  options: Omit<CopyNativeResourcesOptions, 'enable'> = {},
): Plugin {
  return copyNativeResources({ enable, ...options })
}
