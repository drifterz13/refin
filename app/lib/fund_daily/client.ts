import { fundDividendCache } from '../cache'
import { Fund } from '../fund/types'
import { fundDividendHistoriesSchema } from './schema'
import { FundDividendHistory } from './types'

function createFundDailyClient() {
  const baseUrl = 'https://api.sec.or.th/FundDailyInfo'
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=604800',
    'Ocp-Apim-Subscription-Key': process.env.FUND_DAILY_API_KEY as string,
  }

  return {
    get: (path: string) => {
      const url = `${baseUrl}/${path}`
      return fetch(url, { method: 'GET', headers })
    },
  }
}

const fundDailyClient = createFundDailyClient()

export const getFundDividendHistories = async (
  projectId: Fund['proj_id']
): Promise<FundDividendHistory[]> => {
  const cached = fundDividendCache.get(projectId)
  if (cached) {
    return cached
  }

  const data = await fundDailyClient.get(`/${projectId}/dividend`)
  const dataJSON = await data.json()
  console.log(dataJSON)
  const dividendHistories = fundDividendHistoriesSchema.parse(dataJSON)

  fundDividendCache.set(projectId, dividendHistories)

  return dividendHistories
}
