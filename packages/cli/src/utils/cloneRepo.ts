import type { PromptResult } from '../types'
import { exec } from 'node:child_process'
import { promises as fsPromises } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'
import { log } from '@clack/prompts'
import { red } from 'kolorist'
import { replacePackageJson } from './replacePackageJson'

const REPO_URL = 'https://gitee.com/feige996/unibest.git'

async function removeGitFolder(localPath: string): Promise<void> {
  const gitFolderPath = join(localPath, '.git')
  await fsPromises.rm(gitFolderPath, { recursive: true, force: true })
}

async function cloneRepo(projectName: string, branch: string): Promise<void> {
  log.info('从 Git 克隆基础模板...')

  await new Promise<void>((resolve, reject) => {
    const execStr = `git clone --depth=1 -b ${branch} ${REPO_URL} "${projectName}"`

    exec(execStr, async (error) => {
      if (error) {
        log.error(`${red('克隆模板失败:')} ${error}`)
        reject(error)
        return
      }

      try {
        await removeGitFolder(projectName)
        resolve()
      }
      catch (error) {
        log.error(`${red('移除 .git 文件夹失败:')} ${error}`)
        reject(error)
      }
    })
  })
}

export async function cloneRepoByBranch(root: string, name: string, branch: string, options: PromptResult) {
  try {
    await cloneRepo(name, 'base')
  }
  catch (error) {
    log.error(`${red(`模板下载失败！`)} ${error}`)
    process.exit(1)
  }

  const projectPath = join(root, name)
  replacePackageJson(projectPath, name, '1.0.0', options)
}
