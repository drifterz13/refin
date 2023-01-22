import { getFundAmcListById } from '~/lib/fund/client'

import { defer, LoaderArgs } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import Spinner from '~/components/Spinner.react'

export async function loader({ params }: LoaderArgs) {
  return defer({ fundList: getFundAmcListById(params.id as string) })
}

export default function Fund() {
  const data = useLoaderData<typeof loader>()

  return (
    <section>
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>Funds</h2>

      <Suspense fallback={<Spinner />}>
        <Await resolve={data.fundList}>
          {(fundList) => (
            <div className='grid grid-cols-4 gap-2 '>
              {fundList.map((fund) => (
                <div
                  key={fund.regis_id}
                  className='col-span-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'
                >
                  <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>
                    {fund.proj_abbr_name}
                  </h5>
                  <p className='font-normal text-sm text-gray-700'>
                    {fund.proj_name_th}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  )
}
