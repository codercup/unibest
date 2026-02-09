/* eslint-disable node/prefer-global/process */
/* eslint-disable style/brace-style */

import type minimist from 'minimist'
import { intro, log } from '@clack/prompts'
import { bold, green, yellow } from 'kolorist'
import { version } from '../../package.json'
import { beacon } from '../utils/beacon'
import { getUnibestVersionFromGitee as getUnibestVersion } from '../utils/unibestVersion'
import { checkProjectNameExistAndValidate } from '../utils/validate'
import { generateProject } from './create/generate'
import { promptUser } from './create/prompts'

/**
 * 创建项目命令
 */
export async function createCommand(args: minimist.ParsedArgs): Promise<void> {
  const projectName = args._[1] || args._[0] // 不使用 new 关键字也可以直接创建项目

  const versionUnibest = (await getUnibestVersion()) || '4.0.0'

  intro(bold(green(`create-unibest@v${version} 快速创建 ${yellow(`unibest@v${versionUnibest}`)} 项目`)))

  // 验证项目名称
  if (projectName) {
    const errorMessage = checkProjectNameExistAndValidate(projectName)
    if (errorMessage) {
      log.error(errorMessage)
      process.exit(1)
    }
  }

  try {
    // 获取项目配置（通过命令行参数或交互式询问）
    const projectOptions = await promptUser(projectName, args)

    // 生成项目
    await generateProject(projectOptions)

    beacon(projectOptions)
  } catch (error) {
    log.error(`创建项目失败: ${(error as Error).message}`)
    process.exit(1)
  }
}
