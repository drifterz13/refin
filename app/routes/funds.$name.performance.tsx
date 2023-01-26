import { defer, LoaderArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import FundPerformanceTable from '~/components/FundPerformanceTable.react'
import Spinner from '~/components/Spinner.react'
import { getFundPerformance } from '~/lib/fund'
import { getFundByAbbrName, getFundPolicy } from '~/lib/fund/client'

export async function loader({ params }: LoaderArgs) {
  const { name } = params
  const fund = await getFundByAbbrName(name as string)
  const fundPolicy = await getFundPolicy(fund.proj_id)

  return defer({
    fund,
    fundPolicy,
    fundPerf: getFundPerformance(fund.proj_id),
  })
}

export default function FundPerformance() {
  const data = useLoaderData<typeof loader>()

  return (
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
  )
}
