import fs from 'fs/promises'
import { Version, VersionType } from '../version'

describe('test Version class basic constructor and methods', () => {
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

describe('change a package version in an existing package.json file', () => {
    beforeAll(async () => {
        // copy the package.json
        await fs.copyFile('test/package.json', 'test/package-backup.json')
    })
    it('should edit the version', async () => {
        // edit the version
        const version = await Version.readFromPackageJson('test/package.json')
        version.increment(VersionType.MINOR)
        await version.save()
        const newVersion = await Version.readFromPackageJson('test/package.json')
        expect(newVersion.toString()).toBe('1.6.0')
    })
    afterAll(async () => {
        // restore the package.json
        await fs.copyFile('test/package-backup.json', 'test/package.json')
        await fs.rm('test/package-backup.json')
    })
})
