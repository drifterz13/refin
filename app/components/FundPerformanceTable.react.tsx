import { FundPerformance, PerformanceType } from '~/lib/fund/types'

type Props = {
  abbr: string
  fundPerfs: Record<FundPerformance['reference_period'], FundPerformance[]>
}

export default function FundPerformanceTable(props: Props) {
  const periods = [
    { key: '3_month', title: '3m' },
    { key: '6_month', title: '6m' },
    { key: 'year_to_date', title: 'YTD' },
    { key: '5_year', title: '5y' },
    { key: 'ตั้งแต่จัดตั้ง', title: 'MAX' },
  ]

  return (
    <div className='relative overflow-x-auto mt-10'>
      <div className='text-sm font-semibold text-slate-600 mb-2'>
        {props.abbr}
      </div>

      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Perf. Type
            </th>
            {periods.map((p) => (
              <th key={p.key} scope='col' className='px-6 py-3'>
                {p.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(PerformanceType).map((perfType) => (
            <tr
              key={perfType}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
              >
                {perfType}
              </th>
              {periods.map((period, idx) => {
                const perf = (props.fundPerfs[period.key] ?? []).find(
                  (p) => p.performance_type_desc === perfType
                )

                return (
                  <td
                    key={`${perfType}_${perf?.reference_period ?? idx}`}
                    data-period={perf?.reference_period}
                    data-perf-type={perfType}
                    className='px-6 py-4'
                  >
                    {perf?.performance_val ?? '-'}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
