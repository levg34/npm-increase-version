import { Version, VersionType } from '../version'

describe('Test version class', () => {
    const VERSION = '1.5.3'

    it('should be able to parse a version', () => {
        const version = new Version(VERSION)
        expect(version.major).toBe(1)
        expect(version.minor).toBe(5)
        expect(version.fix).toBe(3)
    })

    it('should be able to recreate a string version', () => {
        const version = new Version(VERSION)
        expect(version.toString()).toBe(VERSION)
    })

    it('should be able to increment the major version', () => {
        const version = new Version(VERSION)
        version.increment(VersionType.MAJOR)
        expect(version.toString()).toBe('2.0.0')
    })

    it('should be able to increment the minor version', () => {
        const version = new Version(VERSION)
        version.increment(VersionType.MINOR)
        expect(version.toString()).toBe('1.6.0')
    })

    it('should be able to increment the fix version', () => {
        const version = new Version(VERSION)
        version.increment(VersionType.FIX)
        expect(version.toString()).toBe('1.5.4')
    })

    it('should be able to parse a package.json file to extract the version', async () => {
        const version = await Version.readFromPackageJson('test/package.json')
        expect(version.toString()).toBe('1.5.3')
    })
})
