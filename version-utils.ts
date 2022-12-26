import { VersionType } from "./version"

export type CmdType = 'M' | 'm' | 'f' | 'major' | 'minor' | 'fix'

export const getVersionTypeFromCmd = (cmd: CmdType) => {
    if (cmd === 'M' || cmd === 'major') return VersionType.MAJOR
    if (cmd === 'm' || cmd === 'minor') return VersionType.MINOR
    if (cmd === 'f' || cmd === 'fix') return VersionType.FIX
    throw Error('Unknown version type')
}
