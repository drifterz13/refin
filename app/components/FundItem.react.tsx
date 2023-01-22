import { useNavigate } from '@remix-run/react'
import type { Fund } from '~/lib/fund'

export default function FundItem(props: { fund: Fund }) {
  const navigate = useNavigate()

  return (
    <div
      data-proj-id={props.fund.proj_id}
      className='col-span-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 cursor-pointer'
      onClick={() =>
        navigate(`funds/${props.fund.proj_id}`)
      }
    >
      <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>
        {props.fund.proj_abbr_name}
      </h5>
      <p className='font-normal text-sm text-gray-700'>
        {props.fund.proj_name_th}
      </p>
    </div>
  )
}
