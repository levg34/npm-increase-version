import { getVersionIncreaseFromCommit } from "../git-utils"

describe('Test git-utils', () => {
    it('should return the good version', async () => {
        await getVersionIncreaseFromCommit()
    })
})
