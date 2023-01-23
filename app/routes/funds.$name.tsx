import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import FundPerformanceTable from '~/components/FundPerformanceTable.react'
import { getFundByAbbrName, getFundPerformance } from '~/lib/fund/client'
import { PerformanceType } from '~/lib/fund/types'

export async function loader({ params }: LoaderArgs) {
  const { name } = params
  const fund = await getFundByAbbrName(name as string)
  const fundPerf = await getFundPerformance(fund.proj_id)

  return { fund, fundPerf }
}

export default function FundFromAbbrName() {
  const { fund, fundPerf } = useLoaderData<typeof loader>()

  return (
    <div data-proj-id={fund.proj_id}>
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>
        {fund.proj_abbr_name}
      </h2>
      <p className='text-gray-600 opacity-75'>{fund.proj_name_th}</p>

      <hr className='h-0.5 bg-gray-800 w-full my-5' />

      {Object.keys(fundPerf).length === 0 && (
        <h6 className='text-lg text-gray-800'>
          Fund performance is not available.
        </h6>
      )}

      {Object.keys(fundPerf).map((abbr) => {
        return (
          <FundPerformanceTable
            key={abbr}
            abbr={abbr}
            fundPerfs={fundPerf[abbr]}
          />
        )
      })}
    </div>
  )
}
