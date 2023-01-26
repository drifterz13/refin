import _ from 'lodash'
import { useMemo } from 'react'
import { FundDividendHistory } from '~/lib/fund_daily'

type Props = {
  fundDividends: FundDividendHistory[]
}

export default function FundDividendHistoryTable(props: Props) {
  const columns = [
    { key: 'book_close_date', title: 'Book closing date' },
    { key: 'dividend_date', title: 'Dividend date' },
    { key: 'dividend_value', title: 'Value (THB)' },
  ] as {
    key: keyof FundDividendHistory
    title: string
  }[]

  const recentDividends = useMemo(() => {
    return _.chain(props.fundDividends)
      .filter(
        (fundDividend) =>
          new Date(fundDividend.dividend_date).getFullYear() <=
          new Date().getFullYear()
      )
      .orderBy((fundDividend) => fundDividend.dividend_date, 'desc')
      .take(6)
      .value()
  }, [props.fundDividends])

  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope='col' className='px-6 py-3'>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recentDividends.map((fundDividend) => {
          return (
            <tr
              key={`${fundDividend.dividend_date}_${fundDividend.dividend_value}`}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
            >
              {columns.map((column) => (
                <td
                  key={`${column.key}_${fundDividend[column.key]}`}
                  className='px-6 py-4'
                >
                  {(() => {
                    if (column.key === 'dividend_value') {
                      return (
                        fundDividend[column.key] as unknown as number
                      ).toFixed(2)
                    }

                    return fundDividend[column.key]
                  })()}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
