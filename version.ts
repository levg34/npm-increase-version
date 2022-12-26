import fs from 'fs/promises'

export enum VersionType {
    MAJOR = 'M',
    MINOR = 'm',
    FIX = 'f'
}

export class Version {
    major: number
    minor: number
    fix:   number
    private file?: string
    
    constructor(version: string, file?: string) {
        const splittedVersion = version.split('.')
        this.major = Number(splittedVersion[0])
        this.minor = Number(splittedVersion[1])
        this.fix = Number(splittedVersion[2])
        if (file) this.file = file
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

    getTag(): string {
        return `v${this.toString()}`
    }

    toString(): string {
        return `${this.major}.${this.minor}.${this.fix}`
    }

    async save(): Promise<void> {
        const content = await fs.readFile(this.file ?? 'package.json','utf-8')
        const parsed = JSON.parse(content)
        parsed.version = this.toString()
        await fs.writeFile(this.file ?? 'package.json', JSON.stringify(parsed,null,2)+'\n')
    }

    static async readFromPackageJson(file?: string): Promise<Version> {
        const content = await fs.readFile(file ?? 'package.json','utf-8')
        const {version} = JSON.parse(content)
        if (file) {
            return new Version(version, file)
        }
        return new Version(version)
    }
}
