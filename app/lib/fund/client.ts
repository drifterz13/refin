import { fundListCache } from '../cache'
import {
  fundAmcListSchema,
  fundListSchema,
  fundPerfListSchema,
  fundSchema,
} from './schema'
import {
  Fund,
  FundAMC,
  FundPerformance,
  FundStatus,
  PerformanceType,
} from './types'
import _ from 'lodash'

function createFundAmcClient() {
  const baseUrl = 'https://api.sec.or.th/FundFactsheet'
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age=604800',
    'Ocp-Apim-Subscription-Key': process.env.FUND_FACT_API_KEY as string,
  }

  return {
    get: (path: string) => {
      const url = `${baseUrl}/${path}`
      return fetch(url, { method: 'GET', headers })
    },
    post: (path: string, payload: { name: string }) => {
      const url = `${baseUrl}/${path}`
      return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
    },
  }
}

export const fundAmcClient = createFundAmcClient()

export const getAllFundAmc = async () => {
  const data = await fundAmcClient.get('/fund/amc')
  const dataJSON = await data.json()

  return fundAmcListSchema.parse(dataJSON)
}

export const getFundAmcListById = async (
  id: FundAMC['unique_id']
): Promise<Fund[]> => {
  const cached = fundListCache.get(id)
  if (cached) {
    console.log(`Serve list of fund cache for amc: ${id}`)
    return cached
  }

  const data = await fundAmcClient.get(`/fund/amc/${id}`)
  const dataJSON = await data.json()

  const fundList = fundListSchema.parse(dataJSON)
  const activeFundList = fundList.filter(
    (fund) => fund.fund_status === FundStatus.RG
  )

  if (activeFundList.length === 0) {
    return activeFundList
  }

  fundListCache.set(id, activeFundList)
  console.log(`Total cache size: ${fundListCache.calculatedSize} bytes`)

  return activeFundList
}

export const getFundByAbbrName = async (
  name: Fund['proj_abbr_name']
): Promise<Fund> => {
  const data = await fundAmcClient.post('/fund', { name })
  const dataJSON = await data.json()

  const funds = fundListSchema.parse(dataJSON)
  const exactFundFromAbbrName = funds.find(
    (fund) => fund.proj_abbr_name === name
  )

  return fundSchema.parse(exactFundFromAbbrName)
}

export const getFundPerformance = async (id: Fund['proj_id']) => {
  const data = await fundAmcClient.get(`/fund/${id}/performance`)
  const dataJSON = await data.json()
  const fundPerfList = fundPerfListSchema.parse(dataJSON)

  const fundPerfGroupByAbbr = _.groupBy(
    fundPerfList,
    (fundPerf) => fundPerf.class_abbr_name
  )

  const groupedFundPerf: Record<
    FundPerformance['class_abbr_name'],
    Record<FundPerformance['reference_period'], FundPerformance[]>
  > = Object.keys(fundPerfGroupByAbbr).reduce((acc, abbr) => {
    const fundPerf = fundPerfGroupByAbbr[abbr]
    const fundPerfGroupedByPeriod = _.groupBy(
      fundPerf,
      (fundPerf) => fundPerf.reference_period
    )

    return { ...acc, [abbr]: fundPerfGroupedByPeriod }
  }, {})

  return groupedFundPerf
}
