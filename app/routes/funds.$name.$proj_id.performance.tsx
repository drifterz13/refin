import { defer, LoaderArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import FundPerformanceTable from '~/components/FundPerformanceTable.react'
import Spinner from '~/components/Spinner.react'
import { getFundPerformance } from '~/lib/fund'
import { getFundPolicy } from '~/lib/fund/client'

export async function loader({ params }: LoaderArgs) {
  const { proj_id } = params as { name: string; proj_id: string }
  const fundPolicy = await getFundPolicy(proj_id)

  return defer({
    fundPolicy,
    fundPerf: getFundPerformance(proj_id),
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
              <div className='text-red-500 font-normal mt-5'>
                Fund performance is not available.
              </div>
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
