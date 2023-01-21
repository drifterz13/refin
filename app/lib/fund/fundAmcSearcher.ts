import Fuse from 'fuse.js'
import { FundAMC } from './types'

export const createFundAmcSearcher = (
  fundAmcList: FundAMC[],
  keys: (keyof FundAMC)[]
) => {
  const fuse = new Fuse(fundAmcList, { keys })

  return {
    search(query: string) {
      const items = fuse.search(query)
      return items.map(({ item }) => item)
    },
  }
}
