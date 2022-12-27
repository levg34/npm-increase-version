import args from 'args'
import { getVersionIncreaseFromCommit, createTag, commit, tagExists } from './git-utils'
import { Version, VersionType } from './version'
import { getVersionTypeFromCmd } from './version-utils'

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
        description: 'Use in CI environment. If true, determines the version solely from the last commit message (release:[fix|minor|major]). Example: release:fix fix the broken thing.',
        defaultValue: false
    }
])

const flags = args.parse(process.argv)

const main = async () => {
    try {
        const version = await Version.readFromPackageJson()
        const oldVersion = version.toString()
        if (flags.tag) {
            console.log(version.getTag())
        } else {
            if (flags.ci) {
                const increase = await getVersionIncreaseFromCommit()
                if (increase === VersionType.NO_CHANGE) {
                    console.info('No release necessary.')
                    return
                }
                version.increment(increase)
            } else {
                version.increment(getVersionTypeFromCmd(flags.increase))
            }
            await version.save();
            const commitMsg = 'Upgraded from version ' + oldVersion + ' to version ' + version.toString() + '.'
            console.log(commitMsg)
            // commit the version change
            await commit(commitMsg)
            // tag & push tag
            const tag = version.getTag()
            const ttagExists = await tagExists(tag)
            if (ttagExists) {
                console.warn(`Tag ${tag} already exists.`)
                console.warn(`To overwrite it, run these commands:\n\tgit tag -f ${tag}\n\tgit push origin ${tag}`)
            } else {
                await createTag(tag)
            }
        }
    } catch (error) {
        console.error(error);
    }
}

main()
