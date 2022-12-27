import { getVersionIncrease, tagExists } from "../git-utils"
import { VersionType } from "../version"

describe('Test git-utils', () => {
    it('should return major version', () => {
        const commitMsg = 'release:major a commit message for a major release'
        const version = getVersionIncrease(commitMsg)
        expect(version).toBe(VersionType.MAJOR)
    })
    it('should return minor version', () => {
        const commitMsg = 'release:minor a commit message for a minor release'
        const version = getVersionIncrease(commitMsg)
        expect(version).toBe(VersionType.MINOR)
    })
    it('should return minor version', () => {
        const commitMsg = 'release: a commit message for a minor release'
        const version = getVersionIncrease(commitMsg)
        expect(version).toBe(VersionType.MINOR)
    })
    it('should return fix', () => {
        const commitMsg = 'release:fix a commit message for a fix'
        const version = getVersionIncrease(commitMsg)
        expect(version).toBe(VersionType.FIX)
    })
    it('should return no change', () => {
        const commitMsg = 'a commit message without release change'
        const version = getVersionIncrease(commitMsg)
        expect(version).toBe(VersionType.NO_CHANGE)
    })
})
