import LRU from 'lru-cache'
import sizeOf from 'object-sizeof'
import type { Fund, FundAMC } from '../fund'
import { FundDividendHistory } from '../fund_daily'

let fundListCache: LRU<FundAMC['unique_id'], Fund[]>
let fundDividendCache: LRU<Fund['proj_id'], FundDividendHistory[]>

declare global {
  var __fc: typeof fundListCache | undefined
  var __fd: typeof fundDividendCache | undefined
}

const createCache = <T>(
  options: Partial<LRU.Options<string, T>> = {}
): LRU<string, T> => {
  const defaultOptions = {
    max: 100,
    maxSize: 5e7, // 50mb in bytes unit.
    sizeCalculation: (value: T) => sizeOf(value),
    ttl: 1000 * 60 * 60 * 24, // 1 day

    // return stale items before removing from cache?
    allowStale: false,
  }

  return new LRU({ ...defaultOptions, ...options })
}

const createFundListCache = (
  fetcher?: (id: string) => Fund[]
): typeof fundListCache => {
  return createCache<Fund[]>({
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
  fundDividendCache = createCache<FundDividendHistory[]>()
} else {
  if (!global.__fc) {
    global.__fc = createFundListCache()
  }
  if (!global.__fd) {
    global.__fd = createCache<FundDividendHistory[]>()
  }

  fundListCache = global.__fc
  fundDividendCache = global.__fd
}

export { fundListCache, fundDividendCache }
