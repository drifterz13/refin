import { getFundAmcListById } from '~/lib/fund/client'

import { defer, json, LoaderArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import FundListDropdown from '~/components/FundListDropdown.react'
import { Suspense } from 'react'
import Spinner from '~/components/Spinner.react'

export async function loader({ params }: LoaderArgs) {
  const fundList = await getFundAmcListById(params.id as string)

  return json({ fundList })
}

export default function Fund() {
  const { fundList } = useLoaderData<typeof loader>()

  return (
    <section>
      <h2 className='text-xl font-semibold text-gray-800'>Funds</h2>

      <FundListDropdown fundList={fundList} />

      {/* <Suspense fallback={<Spinner description='preparing funds' />}>
        <Await resolve={fundList}>
          {(data) => <FundListDropdown fundList={data} />}
        </Await>
      </Suspense> */}
    </section>
  )
}
