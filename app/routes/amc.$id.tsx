import { Suspense, useEffect, useReducer, useRef, useState } from 'react'

import { defer, LoaderArgs } from '@remix-run/node'
import { Await, Outlet, useLoaderData } from '@remix-run/react'

import { getFundAmcListById } from '~/lib/fund/client'
import { createfundSearcher, Fund } from '~/lib/fund'

import Spinner from '~/components/Spinner.react'
import SearchBox from '~/components/SearchBox.react'
import FundItem from '~/components/FundItem.react'

const INITIAL_DISPLAY = 20

export async function loader({ params }: LoaderArgs) {
  return defer({ fundList: getFundAmcListById(params.id as string) })
}

export default function Funds() {
  const fundSearcherRef = useRef<ReturnType<typeof createfundSearcher>>()
  const data = useLoaderData<typeof loader>()
  const [seeAll, setSeeAll] = useReducer(() => true, false)
  const [searchedFunds, setSearchedFunds] = useState<Fund[]>()

  useEffect(() => {
    data.fundList.then((funds) => {
      setSearchedFunds(undefined)
      fundSearcherRef.current = createfundSearcher(funds, [
        'proj_abbr_name',
        'proj_name_en',
      ])
    })
  }, [data])

  const seeAllVisible =
    !seeAll && (!searchedFunds || searchedFunds.length > INITIAL_DISPLAY)

  return (
    <section>
      <div className='flex items-baseline justify-between mb-5'>
        <h2 className='text-xl font-semibold text-gray-800'>Funds</h2>
        <SearchBox
          placeholder='Search fund'
          label='Search box fund'
          onChange={(e) => {
            if (!fundSearcherRef.current) {
              return
            }

            if (!e.target.value) {
              // Show page data rather than show empty result when input is empty.
              data.fundList.then((funds) => setSearchedFunds(funds))
            } else {
              const result = fundSearcherRef.current.search(e.target.value)
              setSearchedFunds(result)
            }
          }}
        />
      </div>

      <Suspense fallback={<Spinner />}>
        <Await resolve={data.fundList}>
          {(fundList) => {
            const funds = searchedFunds ?? fundList
            const initialFunds = funds.slice(0, INITIAL_DISPLAY)
            const hiddenFunds = funds.slice(INITIAL_DISPLAY)

            return (
              <>
                <div className='grid grid-cols-4 gap-2 mb-2'>
                  {initialFunds.map((fund) => (
                    <FundItem key={fund.regis_id} fund={fund} />
                  ))}
                  {seeAll
                    ? hiddenFunds.map((fund) => (
                        <FundItem key={fund.regis_id} fund={fund} />
                      ))
                    : null}
                </div>
                {seeAllVisible ? (
                  <div
                    className='font-semibold text-sm text-right text-blue-600 cursor-pointer hover:underline'
                    onClick={setSeeAll}
                  >
                    See all
                  </div>
                ) : null}
              </>
            )
          }}
        </Await>
      </Suspense>

      <Outlet />
    </section>
  )
}
