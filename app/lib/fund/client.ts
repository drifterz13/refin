import { allFundAmcSchema } from './schema'

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
  }
}

export const fundAmcClient = createFundAmcClient()

export const getAllFundAmc = async () => {
  const data = await fundAmcClient.get('/fund/amc')
  const dataJSON = await data.json()
  const allFundAmc = allFundAmcSchema.parse(dataJSON)

  return allFundAmc
}
