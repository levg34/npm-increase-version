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

export async function tag(tag: string): Promise<string> {
    const {stdout} = await execAsync('git tag...')
    return stdout
}