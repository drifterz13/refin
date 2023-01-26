import { defer, LoaderArgs, redirect } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData, useNavigate } from '@remix-run/react'
import clsx from 'clsx'
import TruncateText from '~/components/TruncateText.react'
import { getFundByAbbrName, getFundPolicy } from '~/lib/fund/client'

export async function loader({ params }: LoaderArgs) {
  const { name } = params
  const fund = await getFundByAbbrName(name as string)
  const fundPolicy = await getFundPolicy(fund.proj_id)

  return defer({
    fund,
    fundPolicy,
  })
}

export default function FundFromAbbrName() {
  const data = useLoaderData<typeof loader>()

  return (
    <div data-proj-id={data.fund.proj_id}>
      <h2 className='text-xl font-semibold text-gray-800 mb-2'>
        {data.fund.proj_abbr_name}
      </h2>
      <p className='text-gray-600 opacity-75'>{data.fund.proj_name_th}</p>
      <TruncateText
        text={data.fundPolicy.investment_policy_desc.replace(/•/g, '\n')}
      />

      <hr className='h-0.5 bg-blue-800 w-full my-5' />

      <div className='text-right'>
        <NavLink to='performance'>
          {({ isActive }) => (
            <span
              className={clsx(
                'text-gray-600 text-sm font-normal mx-2 hover:text-blue-600',
                isActive && 'text-blue-600'
              )}
            >
              Performance
            </span>
          )}
        </NavLink>
        <span className='text-gray-600 text-sm font-semibold'>|</span>
        <NavLink to={'dividend'}>
          {({ isActive }) => (
            <span
              className={clsx(
                'text-gray-600 text-sm font-normal mx-2 hover:text-blue-600',
                isActive && 'text-blue-600'
              )}
            >
              Dividend
            </span>
          )}
        </NavLink>
      </div>

      <Outlet />
    </div>
  )
}
