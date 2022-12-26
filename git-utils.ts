import util from 'node:util'
import {exec} from 'node:child_process'
const execAsync = util.promisify(exec)

import { VersionType } from './version'
import { CmdType, getVersionTypeFromCmd } from './version-utils'

export function getVersionIncrease(commitMsg: string): VersionType {
    if (commitMsg.startsWith('release:')) {
        const blob = commitMsg.split(' ')[0].replace('release:', '')
        if (blob === '') return VersionType.MINOR
        return getVersionTypeFromCmd(blob as CmdType)
    }
    return VersionType.NO_CHANGE
}

export async function getVersionIncreaseFromCommit(): Promise<VersionType> {
    const {stdout} = await execAsync('git log -1 --pretty=%B')
    const message = stdout.trim()
    return getVersionIncrease(message)
}

export async function createTag(tag: string): Promise<void> {
    await execAsync('git tag '+tag)
    await execAsync('git push origin '+tag)
}

export async function commit(message: string): Promise<void> {
    await execAsync(`git commit -a -m "${message}"`)
    await execAsync('git push')
}
