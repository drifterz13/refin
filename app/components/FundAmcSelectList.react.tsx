import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { FundAMC } from '~/lib/fund'
import { useNavigate } from '@remix-run/react'
import { clsx } from 'clsx'

type SelectableFund = Pick<FundAMC, 'unique_id' | 'name_en'> & {
  disabled: boolean
}

type Props = {
  fundAmcList: SelectableFund[]
  selectedFund?: SelectableFund
}

export default function FundAmcSelectList(props: Props) {
  const [selectedFundAmc, setSelectedFundAmc] = useState<SelectableFund>(
    props.selectedFund ?? props.fundAmcList[0]
  )
  const navigate = useNavigate()

  return (
    <div className='w-72'>
      <Listbox value={selectedFundAmc} onChange={setSelectedFundAmc}>
        <div className='relative mt-1'>
          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
            <span
              className={clsx(
                'block truncate',
                selectedFundAmc.disabled && 'text-gray-700 opacity-75'
              )}
            >
              {selectedFundAmc.name_en}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {props.fundAmcList.map((fundAmc) => (
                <Listbox.Option
                  key={fundAmc.unique_id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={fundAmc}
                  disabled={fundAmc.disabled}
                  onClick={() => navigate(`/funds/${fundAmc.unique_id}`)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected && 'font-medium',
                          fundAmc.disabled &&
                            'text-gray-600 opacity-50 font-normal'
                        )}
                      >
                        {fundAmc.name_en}
                      </span>
                      {selected ? (
                        <span
                          className={clsx(
                            'absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600',
                            fundAmc.disabled &&
                              'text-gray-600 opacity-75 font-normal'
                          )}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
