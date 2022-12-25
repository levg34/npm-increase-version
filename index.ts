import args from 'args'
import { Version, VersionType } from './version'

args.options([
    {
        name: 'type',
        description: 'The type of version to increment. For example, M or major increments the major version, m the minor, and f the fix',
        defaultValue: 'minor'
    }
])

type CmdType = 'M' | 'm' | 'f' | 'major' | 'minor' | 'fix'

const getVersionTypeFromCmd = (cmd: CmdType) => {
    if (cmd === 'M' || cmd === 'major') return VersionType.MAJOR
    if (cmd === 'm' || cmd === 'minor') return VersionType.MINOR
    if (cmd === 'f' || cmd === 'fix') return VersionType.FIX
    throw Error('Unknown version type')
}

const flags = args.parse(process.argv)

const main = async () => {
    try {
        const version = await Version.readFromPackageJson()
        const oldVersion = version.toString()
        version.increment(getVersionTypeFromCmd(flags.type))
        await version.save();
        console.log('Upgraded from version '+oldVersion+' to version '+version.toString()+'.')
    } catch (error) {
        console.error(error);
    }
}

main()
