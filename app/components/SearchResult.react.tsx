import { Link } from '@remix-run/react'
import { Fund } from '~/lib/fund'

type Props = {
  funds: Fund[]
  onClick: () => void
}

export default function SearchResult(props: Props) {
  return (
    <div className='flex flex-col p-4 gap-2 min-h-[100px] max-h-96 overflow-y-auto'>
      {props.funds.length > 0 ? (
        <>
          <div className='font-semibold text-sm text-gray-600'>Result</div>
          {props.funds.map((fund) => (
            <Link
              to={`/funds/${fund.proj_abbr_name}/dividend`}
              onClick={props.onClick}
              key={fund.proj_abbr_name}
              className='px-6 py-3 rounded-xl bg-slate-100 shadow-sm font-medium hover:bg-blue-600 hover:text-white'
            >
              <div className='uppercase font-semibold'>
                {fund.proj_abbr_name}
              </div>
              <div className='text-xs opacity-60 truncate'>
                {fund.proj_name_en}
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className='text-gray-400 font-light flex-1 grid place-content-center'>
          No search results
        </div>
      )}
    </div>
  )
}
