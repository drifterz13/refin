import { defer, json, LoaderArgs } from '@remix-run/node'
import { useLoaderData, Await } from '@remix-run/react'
import { Suspense } from 'react'
import FundDividendHistoryTable from '~/components/FundDividendHistoryTable.react'
import Spinner from '~/components/Spinner.react'
import { getFundByAbbrName } from '~/lib/fund/client'
import { getFundDividendHistories } from '~/lib/fund_daily'

export async function loader({ params }: LoaderArgs) {
  const { name } = params
  const fund = await getFundByAbbrName(name as string)

  return defer({
    fundDividends: getFundDividendHistories(fund.proj_id),
  })
}

export default function FundDividend() {
  const data = useLoaderData<typeof loader>()

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={data.fundDividends}>
        {(fundDividends) =>
          fundDividends.length > 0 ? (
            <FundDividendHistoryTable fundDividends={fundDividends} />
          ) : (
            <div className='text-red-500 font-normal mt-5'>
              This fund does not pay dividend.
            </div>
          )
        }
      </Await>
    </Suspense>
  )
}
