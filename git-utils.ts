import util from 'node:util'
import {exec} from 'node:child_process'
const execAsync = util.promisify(exec)

import { VersionType } from './version'

export async function getVersionIncreaseFromCommit(): Promise<VersionType> {
    const {stdout} = await execAsync('git log -1 --pretty=%B')
    const message = stdout.trim()
    // if message contains release:
    // release:fix
    console.log(`'${message}'`)
    return VersionType.FIX
}
