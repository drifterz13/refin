import { defer, LoaderArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import FundDividendHistoryTable from '~/components/FundDividendHistoryTable.react'
import FundPerformanceTable from '~/components/FundPerformanceTable.react'
import Spinner from '~/components/Spinner.react'
import TruncateText from '~/components/TruncateText.react'
import {
  getFundByAbbrName,
  getFundPerformance,
  getFundPolicy,
} from '~/lib/fund/client'
import { getFundDividendHistories } from '~/lib/fund_daily'

export async function loader({ params }: LoaderArgs) {
  const { name } = params
  const fund = await getFundByAbbrName(name as string)
  const fundPolicy = await getFundPolicy(fund.proj_id)

  return defer({
    fund,
    fundPolicy,
    fundPerf: getFundPerformance(fund.proj_id),
    fundDividends: getFundDividendHistories(fund.proj_id),
  })
}

export default function FundFromAbbrName() {
  const data = useLoaderData<typeof loader>()

  return (
    <div data-proj-id={data.fund.proj_id}>
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>
        {data.fund.proj_abbr_name}
      </h2>
      <p className='text-gray-600 opacity-75'>{data.fund.proj_name_th}</p>
      <TruncateText
        text={data.fundPolicy.investment_policy_desc.replace(/•/g, '\n')}
      />

      <hr className='h-0.5 bg-blue-800 w-full my-5' />

      <Suspense fallback={<Spinner />}>
        <Await resolve={data.fundPerf}>
          {(fundPerf) => (
            <>
              {Object.keys(fundPerf).length === 0 && (
                <h6 className='text-lg text-red-800'>
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
            </>
          )}
        </Await>
      </Suspense>

      <hr className='h-0.5 bg-blue-800 w-full my-5' />

      <Suspense fallback={<Spinner />}>
        <Await resolve={data.fundDividends}>
          {(fundDividends) => (
            <FundDividendHistoryTable fundDividends={fundDividends} />
          )}
        </Await>
      </Suspense>
    </div>
  )
}
