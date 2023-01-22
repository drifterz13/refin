import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import FundAmcSelectList from '~/components/FundAmcSelectList.react'
import { getAllFundAmc } from '~/lib/fund'
import { useMemo } from 'react'

export async function loader() {
  const fundAmcList = await getAllFundAmc()

  return json({ fundAmcList })
}

export default function FundsIndex() {
  const { fundAmcList } = useLoaderData<typeof loader>()
  const { id: fundAmcId } = useParams()

  const selectableFundList = useMemo(() => {
    const defaultItem = {
      unique_id: 'fund_amc',
      name_en: "Fund's AMC",
      disabled: true,
    }

    return [
      defaultItem,
      ...fundAmcList.map((fund) => ({
        unique_id: fund.unique_id,
        name_en: fund.name_en,
        disabled: false,
      })),
    ]
  }, [fundAmcList])

  const selectedFund = useMemo(
    () =>
      fundAmcId
        ? selectableFundList.find((fund) => fund.unique_id === fundAmcId)
        : selectableFundList[0],
    [selectableFundList, fundAmcId]
  )

  return (
    <div>
      <h2 className='text-xl font-semibold text-gray-800 mb-5'>Select Fund's AMC</h2>
      <FundAmcSelectList
        fundAmcList={selectableFundList}
        selectedFund={selectedFund}
      />

      <section className='mt-5'>
        <Outlet />
      </section>
    </div>
  )
}
