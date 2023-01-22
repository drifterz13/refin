import LRU from 'lru-cache'
import sizeOf from 'object-sizeof'
import type { Fund, FundAMC } from '../fund'

let fundListCache: LRU<FundAMC['unique_id'], Fund[]>

declare global {
  var __fc: typeof fundListCache | undefined
}

const createFundListCache = (
  fetcher?: (id: string) => Fund[]
): typeof fundListCache => {
  return new LRU({
    max: 100,
    maxSize: 5e7, // 50mb in bytes unit.
    sizeCalculation: (value) => sizeOf(value),
    ttl: 1000 * 60 * 60 * 24, // 1 day

    // return stale items before removing from cache?
    allowStale: false,

    fetchMethod: async (key, staleValue, { options, signal }) => {
      return fetcher?.(key) ?? staleValue
    },
  })
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  fundListCache = createFundListCache()
} else {
  if (!global.__fc) {
    global.__fc = createFundListCache()
  }
  fundListCache = global.__fc
}

export { fundListCache }
