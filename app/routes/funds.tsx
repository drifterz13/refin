import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import FundAmcSelectList from '~/components/FundAmcSelectList.react'
import { getAllFundAmc } from '~/lib/fund'

export async function loader() {
  const fundAmcList = await getAllFundAmc()

  return json({ fundAmcList })
}

export default function FundsIndex() {
  const { fundAmcList } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1 className='text-2xl font-semibold text-gray-800'>Setup your port</h1>

      <FundAmcSelectList fundAmcList={fundAmcList} />

      <Outlet />
    </div>
  )
}
