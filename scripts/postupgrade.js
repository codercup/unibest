// # 执行 `pnpm upgrade` 后会升级 `uniapp` 相关依赖
// # 在升级完后，会自动添加很多无用依赖，这需要删除以减小依赖包体积
// # 只需要执行下面的命令即可

import { exec } from 'node:child_process'
import { promisify } from 'node:util'

// 日志控制开关，设置为 true 可以启用所有日志输出
const FG_LOG_ENABLE = true

// 将 exec 转换为返回 Promise 的函数
const execPromise = promisify(exec)

// 定义要执行的命令
const dependencies = [
  // TODO: 如果不需要某个平台的小程序，请手动删除或注释掉
  '@dcloudio/uni-mp-baidu',
  '@dcloudio/uni-mp-jd',
  '@dcloudio/uni-mp-kuaishou',
  '@dcloudio/uni-mp-qq',
  '@dcloudio/uni-mp-xhs',
  '@dcloudio/uni-quickapp-webview',
]

/**
 * 带开关的日志输出函数
 * @param {string} message 日志消息
 * @param {string} type 日志类型 (log, error)
 */
function log(message, type = 'log') {
  if (FG_LOG_ENABLE) {
    if (type === 'error') {
      console.error(message)
    }
    else {
      console.log(message)
    }
  }
}

/**
 * 卸载单个依赖包
 * @param {string} dep 依赖包名
 * @returns {Promise<boolean>} 是否成功卸载
 */
async function uninstallDependency(dep) {
  try {
    log(`开始卸载依赖: ${dep}`)
    const { stdout, stderr } = await execPromise(`pnpm un ${dep}`)
    if (stdout) {
      log(`stdout [${dep}]: ${stdout}`)
    }
    if (stderr) {
      log(`stderr [${dep}]: ${stderr}`, 'error')
    }
    log(`成功卸载依赖: ${dep}`)
    return true
  }
  catch (error) {
    // 单个依赖卸载失败不影响其他依赖
    log(`卸载依赖 ${dep} 失败: ${error.message}`, 'error')
    return false
  }
}

/**
 * 串行卸载所有依赖包
 */
async function uninstallAllDependencies() {
  log(`开始串行卸载 ${dependencies.length} 个依赖包...`)

  let successCount = 0
  let failedCount = 0

  // 串行执行所有卸载命令
  for (const dep of dependencies) {
    const success = await uninstallDependency(dep)
    if (success) {
      successCount++
    }
    else {
      failedCount++
    }

    // 为了避免命令执行过快导致的问题，添加短暂延迟
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  log(`卸载操作完成: 成功 ${successCount} 个, 失败 ${failedCount} 个`)
}

// 执行串行卸载
uninstallAllDependencies().catch((err) => {
  log(`串行卸载过程中出现未捕获的错误: ${err}`, 'error')
})
