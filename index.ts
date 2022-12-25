import { Version } from './version'

(async () => {
    try {
        const version = await Version.readFromPackageJson()
        console.log(version)
    } catch (error) {
        console.error(error)
    }
})()
