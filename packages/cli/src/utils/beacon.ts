/* eslint-disable node/prefer-global/process */
import type { PromptResult } from '../types'
import crypto from 'node:crypto'
import os from 'node:os'
import dayjs from 'dayjs'
import fetch from 'node-fetch'
import packageJSON from '../../package.json'
import { debug } from './debug'
import { getUnibestVersionFromGitee as getUnibestVersion } from './unibestVersion'

/**
 * 发送统计数据到服务器
 * @param options - 项目配置选项
 */
export async function beacon(options: PromptResult) {
  try {
    const unibestVersion = await getUnibestVersion()
    const deviceIdentifier = generateDeviceIdentifier()

    await fetch('https://ukw0y1.laf.run/create-unibest-v3/beacon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...options,
        version: unibestVersion,
        cbVersion: packageJSON.version,
        createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        nodeVersion: process.version,
        osPlatform: process.platform,
        cpuModel: os.cpus()[0]?.model || 'unknown',
        osRelease: os.release(),
        totalMem: Math.round(os.totalmem() / (1024 * 1024 * 1024)), // 四舍五入为整数 GB
        cpuArch: process.arch,
        uuid: deviceIdentifier, // 添加设备唯一标识符
      }),
    })
    debug('Beacon sent successfully')
  }
  catch (error) {
    // 不需要打印
  }
}

/**
 * 生成设备唯一标识符
 * @returns 设备唯一标识符（SHA-256哈希）
 */
function generateDeviceIdentifier(): string {
  const deviceInfo = [os.cpus()[0]?.model || '', os.totalmem().toString(), os.platform(), os.userInfo().username].join(
    '|',
  )

  const hash = crypto.createHash('sha256').update(deviceInfo).digest('hex')
  return hash
}
