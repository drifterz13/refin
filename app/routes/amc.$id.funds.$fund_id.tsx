import { Await, useParams, useRouteLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import type { Fund } from '~/lib/fund'
import Spinner from '~/components/Spinner.react'

export default function FundId() {
  const params = useParams() as { fund_id: string }
  const data = useRouteLoaderData('routes/amc.$id') as {
    fundList: Promise<Fund[]>
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={data.fundList}>
        {(funds) => {
          const fund = funds.find((fund) => fund.proj_id === params.fund_id)

          return <pre>{JSON.stringify(fund, null, 2)}</pre>
        }}
      </Await>
    </Suspense>
  )
}
