import Fuse from 'fuse.js'
import { Fund } from './types'

export const createfundSearcher = (fundList: Fund[], keys: (keyof Fund)[]) => {
  const fuse = new Fuse(fundList, { keys, shouldSort: true, threshold: 0.3 })

  return {
    search(query: string) {
      const items = fuse.search(query)

      return items.map(({ item }) => item)
    },
  }
}
