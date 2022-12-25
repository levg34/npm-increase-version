import { Version, VersionType } from './version'

(async () => {
    try {
        const version = await Version.readFromPackageJson()
        console.log(version)
        version.increment(VersionType.MINOR)
        await version.save()
    } catch (error) {
        console.error(error)
    }
})()
