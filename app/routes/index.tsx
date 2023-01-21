import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import FundAmcDropdown from '~/components/FundAmcDropdown.react'
import { getAllFundAmc } from '~/lib/fund'

export async function loader() {
  return json({ fundAmcList: await getAllFundAmc() })
}

export default function Index() {
  const { fundAmcList } = useLoaderData<typeof loader>()

  return (
    <section>
      <h1 className='text-2xl font-semibold text-gray-900'>Setup your port</h1>

      <FundAmcDropdown fundAmcList={fundAmcList} />
    </section>
  )
}
