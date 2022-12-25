import fs from 'fs/promises'
import { Version } from './version'

(async () => {
    try {
        const content = await fs.readFile('package.json','utf-8')
        const {version: v} = JSON.parse(content)
        const version = new Version(v)
    } catch (error) {
        console.error(error)
    }
})()
