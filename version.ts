import fs from 'fs/promises'

export enum VersionType {
    MAJOR,
    MINOR,
    FIX
}

export class Version {
    major: number
    minor: number
    fix:   number

    constructor(version: string) {
        const splittedVersion = version.split('.')
        this.major = Number(splittedVersion[0])
        this.minor = Number(splittedVersion[1])
        this.fix = Number(splittedVersion[2])
    }

    increment(type: VersionType) {
        if (type === VersionType.MAJOR) {
            this.major += 1
            this.minor = 0
            this.fix = 0
        } else if (type === VersionType.MINOR) {
            this.minor += 1
            this.fix = 0
        } else if (type === VersionType.FIX) {
            this.fix += 1
        } else {
            throw Error('Unknown version type')
        }
    }

    toString(): string {
        return `${this.major}.${this.minor}.${this.fix}`
    }

    static async readFromPackageJson(file?: string): Promise<Version> {
        const content = await fs.readFile(file ?? 'package.json','utf-8')
        const {version} = JSON.parse(content)
        return new Version(version)
    }
}
