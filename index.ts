import args from 'args'
import fs from 'fs/promises'
import { Version, VersionType } from './version'

args.options([
    {
        name: 'increase',
        description: 'The type of version to increment. For example, M or major increments the major version, m the minor, and f the fix',
        defaultValue: 'minor'
    },
    {
        name: 'tag',
        description: 'Returns the tag to create',
        defaultValue: false
    },
    {
        name: 'ci',
        'description': 'Use in CI environment. If true, creates a file with the version after increasing the version',
        defaultValue: false
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
        if (flags.tag) {
            console.log(version.getTag())
        } else {
            version.increment(getVersionTypeFromCmd(flags.increase))
            await version.save();
            if (flags.ci) {
                fs.writeFile('VERSION',version.getTag())
            }
            console.log('Upgraded from version '+oldVersion+' to version '+version.toString()+'.')
        }
    } catch (error) {
        console.error(error);
    }
}

main()
